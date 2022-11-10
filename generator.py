from faker import Faker
import random
fake = Faker()
Faker.seed()

n = 10000
with open("sample.json", "w") as outfile:
    for a in range(n):
        id = str(a)
        username = fake.simple_profile()["username"]
        email = fake.simple_profile()["mail"]
        password = fake.password(length=12)
        created_on = fake.date_this_month()
        last_login = fake.date_between(created_on)

        paises = ["Italy", "Argentina", "Brazil", "Chile", "Mexico", "Panama", "Spain", "Wales", "Uruguay", "South-Africa"]
        NBA_Teams = ["Utah Jazz", "Phoenix Suns", "Denver Nuggets", "Portland Trail Blazers", "Memphis Grizzlies", "Dallas Mavericks", "LA Clippers", "New Orleans Pelicans", "Minnesota Timberwolves"]
        NBA_Team = NBA_Teams[random.randint(0,8)]
        pais = paises[random.randint(0,9)]
        leagues = ["A", "B", "C"]
        league = leagues[random.randint(0,2)]
            
            

        dictionary = f'"id": "{id}", "username": "{username}", "email": "{email}", "password": "{password}", "created_on": "{created_on}", "last_login": "{last_login}", "nba_team_preferences": "{NBA_Team}", "football_league_preferences": "{league}", "football_country_preferences": "{pais}"'
        
        outfile.write('{"index":{}}\n')

        outfile.write("{"+dictionary+"}\n")
    outfile.close()