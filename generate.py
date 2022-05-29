# word_list taken from https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-no-swears.txt

def words(filename):
    f = open(filename, "r")
    ls = []
    line = f.readline()
    while line:
        if len(line) > 5:
            ls.append(line[:-1])
        line = f.readline()
    f.close()
    return ls

def new(filename, ls):
    f = open(filename, "w")
    for i in ls:
        f.write(i + "\n")
    f.close()
word_list = words("word_list.txt")
new("words.txt", word_list)
