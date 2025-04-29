//create a pom for login 
 class Login {
    //  Gather all login page selectors 

    selector= {

        Logo: ()=> cy.get('.login_logo') ,
        username: ()=> cy.get('#user-name'),
        password: ()=> cy.get('#password'),
        loginbtn: ()=> cy.get('#login-button'),
        errormsg: () => cy.get('[data-test="error"]'),
        errorbtn: ()=> cy.get('[data-test="error-button"]')

    };

    //create commands for all logins and cacth msg error 
    commands = {
        login: (username, password)=> {
            if (username) this.selector.username().type(username);
            if (password) this.selector.password().type(password);
            this.selector.loginbtn().click();

        },
        error: (msg) =>{
            this.selector.errormsg().should('be.visible').and('have.text',msg);
            this.selector.errorbtn().should('be.visible').click();
            this.selector.errorbtn().should('not.exist');

        }

    };


}

export default new Login()