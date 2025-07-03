import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { ProveedoresService } from './proveedores/proveedores.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, UsuariosService, ProveedoresService],
})
export class AppModule {}
