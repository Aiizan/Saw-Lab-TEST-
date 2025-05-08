import loginPom from "./POM/login-pom"
import checkout_pom from "./POM/checkout_pom"
import inventory_pom from "./POM/inventory_pom"
import cart_pom from "./POM/cart_pom"

describe ('Ckeckout test', ()=> {
    //visit page , login , cart ,  go to checkout

    beforeEach(()=> {
        cy.visit('/')
        loginPom.commands.login('standard_user', 'secret_sauce')
        cy.url().should('include','/inventory.html')    

        //add two element to cart
        inventory_pom.selector.item.addToCart().eq(0).click()
        inventory_pom.selector.item.addToCart().eq(0).click()
        cart_pom.selector.cartbadge().should('have.text', '2')
        cart_pom.selector.cartIcon().click()
        //go checkout

        cart_pom.selector.checkoutbttn().click()     
    })

    
    it('items completeness', ()=> {
        checkout_pom.selector.title().should('have.text', 'Checkout: Your Information')
        checkout_pom.selector.firstname().should('have.attr', 'placeholder', 'First Name')
        checkout_pom.selector.lastname().should('have.attr', 'placeholder','Last Name')
        checkout_pom.selector.zip().should('have.attr', 'placeholder','Zip/Postal Code')
        checkout_pom.selector.cancelbttn().should('have.text', 'Cancel')
        checkout_pom.selector.continuebttn().should('have.attr', 'value', 'Continue') 

    })


    it ('All fields empty', ()=> {
        checkout_pom.selector.continuebttn().click()
        checkout_pom.commands.error('Error: First Name is required')

    })

    it ('Name without Last Name and Zip', ()=> {
        checkout_pom.selector.firstname().click().type('Luan')
        checkout_pom.selector.continuebttn().click()
        checkout_pom.commands.error('Error: Last Name is required')

    })

    it('Name and Last Name without Zip',()=> {
        checkout_pom.selector.firstname().click().type('Luan')
        checkout_pom.selector.lastname().click().type('Acevedo')
        checkout_pom.selector.continuebttn().click()
        checkout_pom.commands.error('Error: Postal Code is required')
    })

    it('All fields loaded ', ()=> {
        checkout_pom.selector.firstname().click().type('Luan')
        checkout_pom.selector.lastname().click().type('Acevedo')
        checkout_pom.selector.zip().click().type('tc4132')
        checkout_pom.selector.continuebttn().click()
        cy.url().should('contain', 'checkout-step-two.html')

        //verefy price

        checkout_pom.commands.pricetotal()
       
    })

   



})