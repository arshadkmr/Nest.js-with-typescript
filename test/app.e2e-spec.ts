import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { AuthDto } from '../src/auth/dto/auth.dto';
import { EditUserDto } from 'src/user/dto';



describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init()
    await app.listen(3333)
    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'arshad1@gmail.com',
      password: 'arshad@123'
    }
    describe('Signup', () => {
      // it('should throw if email is already exists',()=>{
      //   return pactum.spec().post('/auth.signup').withBody(dto).expectStatus(409)
      // })
      it('should throw if email is empty', () => {
        return pactum.spec().post('/auth/signup').withBody({ password: dto.password }).expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum.spec().post('/auth/signup').withBody({ email: dto.email }).expectStatus(400)
      })
      it('should throw if no body provider', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })
      it('should sign up', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201)
      })
    })
    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum.spec().post('/auth/login').withBody({ password: dto.password }).expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum.spec().post('/auth/login').withBody({ email: dto.email }).expectStatus(400)
      })
      it('should throw if no body provider', () => {
        return pactum.spec().post('/auth/login').expectStatus(400)
      })
      it('should sign in', () => {
        return pactum.spec().post('/auth/login').withBody(dto).expectStatus(200).stores('userToken', 'token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('/users/me').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200)
      })
    })
    describe('Edit user', () => {
      it('should update current user', () => {
        const dto: EditUserDto = {
          email: 'arshad1@gmail.com',
          name: 'arshad'
        }
        return pactum.spec().patch('/users/me').withHeaders({ Authorization: 'Bearer $S{userToken}' }).withBody(dto).expectStatus(200)
      })
    })
  })
  describe('BookMark', () => {
    describe('Create bookmark', () => { })
    describe('Get bookmarks', () => { })
    describe('Get bookmark by id', () => { })
    describe('Edit bookmark by id', () => { })
    describe('Delete bookmark by id', () => { })
  })
})