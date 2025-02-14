import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password } = registerDto;

   
    const existingUsername =
      await this.usersService.findOneByUsername(username);
    if (existingUsername) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    const existingEmail = await this.usersService.findOneByEmail(email);
    if (existingEmail) {
      throw new Error('El correo electrónico ya está en uso');
    }

   
    const user = await this.usersService.create({ username, email, password });
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersService.validateUserByEmail(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
