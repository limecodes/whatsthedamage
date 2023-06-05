# What's the Damage
The project "What's the Damage" is a simple spending analysis tool that helps to identify where money is being spent in order to provide insight for planning a basic budget while incorporating savings.

## Quick setup
1. `yarn && yarn app:start`

## Technical Approach
The expense tracker is purely browser based. It doesn't depend on an API or backend database. It simple reads a CSV file and breaks down the expenses into categories. Over time expenses can be tracked against a budget by simply uploading a CSV-based statement.

The budget is saved into local storage.

As the user categorises transactions, similar transactions are automatically categorised. Patterns to identify similar transactions are stored in local storage for the future.

Material UI leverages to put the primary focus on the functionality rather than the cosmetics.

While the `app` is the only package in the project, I still maintain a mono-repo style in order to possibly accommodate a server application or component library in the future.

## Potential Enhancements
- Instead of local storage, use IndexedDB for more robust data handling in browser
- Add more robust handling of files (check filesize and number of rows so to not overload the state)
