import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    // Lógica para registrar un usuario
  }

  async login(loginDto: LoginDto) {
    // Lógica para iniciar sesión
  }
}