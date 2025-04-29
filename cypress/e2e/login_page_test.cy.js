import loginPom from "./POM/login-pom";

//create test cases for Login page

describe ('login test', ()=> {

    //visit url on cypress.config.js 
    beforeEach(()=>{
        cy.visit('/')
    })
    //first check if all load correctly 
    it ('load page', ()=>{
        loginPom.selector.Logo().should('be.visible').and('have.text', 'Swag Labs');
        loginPom.selector.username().should('have.attr', 'placeholder', 'Username');
        loginPom.selector.password().should('have.attr', 'placeholder', 'Password');
        loginPom.selector.loginbtn().should('have.attr', 'value', 'Login');

    })

    // start login test
    it('login without any credentials', ()=> {
        loginPom.commands.login()
        loginPom.commands.error('Epic sadface: Username is required')
    })

    it('Login username but without password', ()=> {
        loginPom.commands.login('standard_user', '')
        loginPom.commands.error('Epic sadface: Password is required')
    })

    it ('Login password but without username', ()=> {
        loginPom.commands.login( '','secret_sauce')
        loginPom.commands.error('Epic sadface: Username is required')
    })

    it ('login with wrong username', ()=>{
        loginPom.commands.login('luanac', 'secret_sauce')
        loginPom.commands.error('Epic sadface: Username and password do not match any user in this service')
    })

    it('Login with wrong password', ()=> {
        loginPom.commands.login('standard_user','badpassword')  
        loginPom.commands.error('Epic sadface: Username and password do not match any user in this service')
    })

    it('Login standar user', ()=> {
        loginPom.commands.login('standard_user', 'secret_sauce')
        cy.url().should('include','/inventory.html')
    })

    it ('Login with blocked user', ()=>{
        loginPom.commands.login('locked_out_user', 'secret_sauce')
        loginPom.commands.error('Epic sadface: Sorry, this user has been locked out.')
    })

})

