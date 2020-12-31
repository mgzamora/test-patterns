Feature: Obtain a list of quotes
    In order to have a list of quotes
    As a user
    I want to see the quotes

    Scenario: Retrieve an empty list of quotes
        When I send a GET request to "/api/quote"
        Then the response status code should be 200
        And the response content should be an empty list
  
    Scenario: Retrieve a list of quotes
        Given a previous quotes already created in db with values:
            |id                                   | text                                                                                                                        |
            |4be0643f-1d98-573b-97cd-ca98a65347dd | The problem with the world is that the intelligent people are full of doubts. While the stupid ones are full of confidence. |
            |63cb5d18-4e8b-5765-8894-ebd6adcc4bcd | What matters most is how well you walk through the fire.                                                                    |
        When I send a GET request to "/api/quote"
        Then the response status code should be 200
        And the response content should be:
        """
        [{
            "id": "4be0643f-1d98-573b-97cd-ca98a65347dd",
            "text": "The problem with the world is that the intelligent people are full of doubts. While the stupid ones are full of confidence."
        },   
        {
            "id": "63cb5d18-4e8b-5765-8894-ebd6adcc4bcd",
            "text": "What matters most is how well you walk through the fire."
        }]
        """