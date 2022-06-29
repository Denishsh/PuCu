Feature: Check site of movie tickets
    Scenario: Open site and get list of tickets
        Given user is on "/index" page
        When user clicked on MovieTickets
        Then user sees list of tickets and text MovieTime
    
    Scenario: Buy ticket
        Given user moved to tickets page
        When user clicked on empty ticket and buy this
        Then check operation status is success

    Scenario: Neg. Disabled button before select ticket
        Given user moved to tickets page
        When user clicked on buy button
        Then user sees list of tickets and text MovieTime