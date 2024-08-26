describe('Central de Atendimento ao Cliente TAT', () => {

  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwyz', 10)

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('marcos.roda@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:2})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('marcos.roda')
    cy.get('#open-text-area').type(longText, {delay:2})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible').click()
  })

  it('telefone aceita somente numeros', () =>{
    cy.get('#phone')
    .type('abc')
    .should('be.empty')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('marcos.roda')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('#open-text-area').type(longText, {delay:2})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Marcos')
    .should('have.value', 'Marcos')
    .clear()
    .should('be.empty')

    cy.get('#lastName')
    .type('Junior')
    .should('have.value', 'Junior')
    .clear()
    .should('be.empty')

    cy.get('#email')
    .type('marcos.roda@gmail.com')
    .should('have.value', 'marcos.roda@gmail.com')
    .clear()
    .should('be.empty')

    cy.get('#phone')
    .type('123')
    .should('have.value', '123')
    .clear()
    .should('be.empty')
    
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Marcos',
      lastName: 'Junior',
      email: 'marcos.roda@gmail.com',
      message: 'teste'
    }

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice)', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"').check('feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each((serviceCheck) => {
      cy.wrap(serviceCheck)
      .check()
      .should('be.checked')
    }) 
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.fixture('example.json', null).as('myFile')
    cy.get('#file-upload').selectFile('@myFile')
    .then(($input) =>{
      expect($input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.fixture('example.json', null).as('myFile')
    cy.get('#file-upload').selectFile('@myFile', {action: 'drag-drop', timeout: 10000})
    
    .then(($input) =>{
      expect($input[0].files[0].name).to.eq('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a')
    .invoke('removeAttr', 'target')
    .click()

    cy.get('H1').should('have.text', 'CAC TAT - Política de Privacidade')
  })

})