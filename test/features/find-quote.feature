Feature: Obtain a quote by its id
    As a user
    I want to see a quote information

    Scenario: Retrieve an existing quote
        Given a previous quote already created in db with values:
                |id                                   | text                                                               |
                |01d2f0ce-8f47-56e4-9a9c-0f368406feb7 | To love only what happens, what was destined. No greater harmony.  |
        When I send a GET request to "/api/quote/01d2f0ce-8f47-56e4-9a9c-0f368406feb7"
        Then the response status code should be 200
        And the response content should be:
        """
        {
            "id": "01d2f0ce-8f47-56e4-9a9c-0f368406feb7",
            "text": "To love only what happens, what was destined. No greater harmony."
        }
        """
    
    Scenario: Try to retrieve a not existing quote
        When I send a GET request to "/api/quote/01d2f0ce-8f47-56e4-9a9c-0f368406feb7"
        Then the response status code should be 404
        And the response content should be:
        """
        {
            "message": "The quote with id <01d2f0ce-8f47-56e4-9a9c-0f368406feb7> does not exist.",
            "name": "QouteNotFoundError",
            "timestamp": "2021-01-01T00:00:00.000Z"
        }
        """