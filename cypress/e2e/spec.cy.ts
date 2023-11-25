describe('Tests for the Landing page', () => {

  const firstPageOfStocks = [
    'Agilent Technologies, Inc. Common Stock',
    'Alcoa Corporation Common Stock ',
    'Perth Mint Physical Gold ETF',
    'ATA Creativity Global - American Depositary Shares',
    'AdvisorShares Dorsey Wright ADR ETF',
  ];
  const firstPageOfStockSymbols = [
    'A',
    'AA',
    'AAAU',
    'AACG',
    'AADR',
  ];
  const secondPageOfStocks = [
    'American Airlines Group, Inc. - Common Stock',
    'Altisource Asset Management Corp Com',
    'Atlantic American Corporation - Common Stock',
    'Aaron\'s, Inc. Common Stock',
    'Applied Optoelectronics, Inc. - Common Stock',
  ];
  const secondPageOfStockSymbols = [
    'AAL',
    'AAMC',
    'AAME',
    'AAN',
    'AAOI',
  ];

  let hasStockNames = (stockList: string[]) => {
    stockList.forEach((stock) => {
      cy.contains(stock)
    });
  }

  beforeEach(() => {
    cy.visit('/')
  })
  it('Visits the initial project page', () => {
    cy.contains('Stock List')
    cy.contains('Next')
    cy.contains('Previous')
    cy.contains('Nasdaq traded')
  })
  /*
  it('Contains the correct number of stocks (5)', () => {
    cy.get('').children().should('have.length', 5)
  })
   */
  it('should contain the first page of stock names', () => {
    hasStockNames(firstPageOfStocks);
  })
  it('should contain the first page of stock symbols', () => {
    hasStockNames(firstPageOfStockSymbols);
  });
  it('should have the same stocks when cliclking previous on the first page', () => {
    cy.get('button').contains('Previous').should('be.disabled')
    hasStockNames(firstPageOfStocks);
    secondPageOfStocks.forEach((stock) => {
      cy.contains(stock).should('not.exist')
    });
  });
  it('should have the next page of stocks when clicking on next page', () => {
    cy.get('button').contains('Next').click();
    secondPageOfStocks.forEach((stock) => {
      cy.contains(stock)
    })
  });
  it('should have the first page when clicking next and previous', () => {
    cy.get('button').contains('Next').click();
    hasStockNames(secondPageOfStocks);
    cy.get('button').contains('Previous').click();
    hasStockNames(firstPageOfStocks);
  });
  it('should open the drawer', () => {
    cy.get('.ng-trigger-openClose').click();
    cy.contains('Favorite Stocks')
    cy.contains('My Stocks')
    cy.contains('Wallet')
    cy.contains('Profile')
    cy.contains('Login')
  });
  it('should search for Microsoft', () => {
    cy.get('.ng-trigger-openClose').click();
    cy.get('#mat-mdc-form-field-label-0 > .ng-tns-c1205077789-2').click();
    cy.get('#mat-input-0').click();
    const form = cy.get('form');
    const textbox = cy.get('#mat-input-0')
    textbox.type('MSFT');
    form.submit();
    cy.contains('MSFT');
    cy.contains('Microsoft Corporation - Common Stock');
    cy.get('.text-xl').click();
    cy.contains('Recent data of MSFT');
    cy.contains('The open price:')
    cy.contains('The highest price:')
    cy.contains('The lowest price:')
    cy.contains('The close price:')
    cy.contains('The volume weighted average price')
    cy.contains('The trading volume:')
    cy.contains('Profit Prophet is predicting...')
  });

  it('should search for Hewlett-Packard', () => {
    cy.get('.ng-trigger-openClose').click();
    cy.get('#mat-mdc-form-field-label-0 > .ng-tns-c1205077789-2').click();
    cy.get('#mat-input-0').click();
    const form = cy.get('form');
    const textbox = cy.get('#mat-input-0')
    textbox.type('HPQ');
    form.submit();
    cy.contains('HPQ');
    cy.contains('HP Inc. Common Stock');
    cy.get('.text-xl').click();
  });

  it('should contain the stock symbol', () => {
    cy.visit('/stockhistory/MSFT');
    cy.contains('MSFT');
  });
  it('should contain the Polygon card', () => {
    cy.visit('/stockhistory/MSFT');
    cy.contains('Recent data of MSFT');
    cy.contains('The open price:')
    cy.contains('The highest price:')
    cy.contains('The lowest price:')
    cy.contains('The close price:')
    cy.contains('The volume weighted average price')
    cy.contains('The trading volume:')
  });

  it('should have profit prophet predicting', () => {
    cy.visit('/stockhistory/MSFT');
    cy.contains('Profit Prophet is predicting...')
  });
})
