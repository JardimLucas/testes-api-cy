/// <reference types = 'cypress' />

import Faker from 'faker-br/lib';
import contrato from '../contracts/usuarios.contract'
import faker from 'faker-br';
import Fake from 'faker-br/lib/fake';
       


describe('Testes da Funcionalidade Usuários', () => {
    
     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.equal('Arnaldo Biruleibe')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nomefaker = faker.name.firstName()
          let emailfaker = faker.internet.email()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    nome: nomefaker,
                    email: emailfaker,
                    password: "teste",
                    administrador: "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuarios('Abacuque Pirilampo', 'beltrano.qa.com.br', 'teste', 'true')
          .then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal('email deve ser um email válido')
          })
     });

     it('Deve validar um usuário com email já cadastrado', () => {
          cy.cadastrarUsuarios('Abacuque Pirilampo', 'beltrano@qa.com.br', 'teste', 'true')
          .then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nomefaker = faker.name.firstName()
          let emailfaker = faker.internet.email()
          cy.cadastrarUsuarios(nomefaker, emailfaker, 'teste', 'true')
          .then(response => {
               let id = response.body._id          
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         nome: nomefaker,
                         email: emailfaker,
                         password: "teste",
                         administrador: "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
               })
          }) 
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuarios('Indiana Jones', 'indiana.jones@qa.com.br', 'teste', 'true')
          .then(response => {
               let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: `usuarios/${id}`,
          }).then(response => {
               expect(response.body.message).to.equal('Registro excluído com sucesso')
               expect(response.status).to.equal(200)
          })
          })
     });


});
