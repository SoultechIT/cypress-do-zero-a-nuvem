describe('Pagina de Privacidade', () => {

    beforeEach(() => {
      cy.visit('./src/privacy.html')
    })
    
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    })

    it('verifica o cabeçalho da aplicação', () => {
        cy.get('H1').should('have.text', 'CAC TAT - Política de Privacidade')
    })

    it('verifica se o paragrafo contem Talking About Testing', () => {
        cy.contains('p', 'Talking About Testing').should('be.visible')
    })
})  