with open("winequality-white.csv","r") as wine_file:
    target = open("wine.csv","w")

    for line in wine_file.readlines():
        target.writelines(line.replace(';',','))

    target.close()
