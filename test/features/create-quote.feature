Feature: Create a quote by its id
    As a user
    I want to see create a quote in the app

    Scenario: A quote is created
        When I send a PUT request to "/api/quote/01d2f0ce-8f47-56e4-9a9c-0f368406feb7" with body:
        """
        {
            "text": "The happiness of your life depends upon the quality of your thoughts."
        }
        """
        Then the response status code should be 201
        And the response content should be empty