class Cart {
    selector = {
        cartIcon: () => cy.get('#shopping_cart_container'),
        burgerbttn: () => cy.get('#react-burger-menu-btn'),
        title: () => cy.get('[data-test="title"]'),
        qty : () => cy.get('[data-test="cart-quantity-label"]'),
        description: () => cy.get('[data-test="cart-desc-label"]'),
        shoppingbttn: ()=>  cy.get('#continue-shopping'),
        checkoutbttn: ()=> cy.get('#checkout'),
        cartbadge: ()=> cy.get('.shopping_cart_badge'),
        sidebar: {
            menuwrap: ()=> cy.get('.bm-menu-wrap'),
            sidebarAllItems: ()=> cy.get('#inventory_sidebar_link'),
            sidebarAbout: ()=> cy.get('#about_sidebar_link'),
            sidebarLogout: ()=> cy.get('#logout_sidebar_link'),
            sidebarResetAppState:()=> cy.get('#reset_sidebar_link'),
            buttonclose: ()=> cy.get('#react-burger-cross-btn'),
        },
         item : {
            cartitem: ()=> cy.get('[data-test="inventory-item"]'),
            cartquantity : ()=> cy.get ('[data-test="item-quantity"]'),
            title: ()=> cy.getElementByDataTestLike('title-'),
            invdescription : ()=> cy.get('[data-test="inventory-item-desc"]'),
            price: ()=> cy.get('[data-test="inventory-item-price"]'),
            removebttn: ()=> cy.getElementByDataTestLike('remove-sauce-labs-'),

        },

}


}

export default new Cart() 