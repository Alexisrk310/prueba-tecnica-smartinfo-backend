import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ access_token: string; user: any }> {
    const { username, email, password, isAdmin } = registerDto;

    // Verificar si el nombre de usuario ya está en uso
    const existingUsername =
      await this.usersService.findOneByUsername(username);
    if (existingUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
    }

    // Verificar si el correo electrónico ya está en uso
    const existingEmail = await this.usersService.findOneByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('El correo electrónico ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario (puede ser un administrador si isAdmin es true)
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Valor por defecto
    });

    // Generar un token JWT para el usuario
    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    const access_token = this.jwtService.sign(payload);

    // Devolver el token y la información del usuario
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // Validar el usuario
    const user = await this.usersService.validateUserByEmail(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar un token JWT para el usuario
    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
