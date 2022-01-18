from calendar import c
import imp
from random import choice
from itertools import chain
import MySQLdb

def recommand(user_id):
    db = MySQLdb.connect('localhost', 'root', '1234', 'recommand')
    cursor = db.cursor()

    sql = 'select anime_id from user_anime where user_id={}'.format(user_id)

    cursor.execute(sql)

    love_anime_id_list = list(chain(*cursor.fetchall()))

    sql = '''select style_id, count(style_id) from (
        select style_id from anime_style where anime_id in(
            select anime_id from user_anime where user_id = 1
            )) as a
        group by 1 order by 2 desc limit 3;
    '''.format(user_id)

    cursor.execute(sql)
    love_style = cursor.fetchall()
    anime_dict = {}

    for (style_id, _) in love_style:
        print(style_id)
        sql = sql = 'select anime_id from anime_style where style_id = {} ' \
            .format(style_id)
        cursor.execute(sql)
        anime_dict[str(style_id)] = [i[0] for i in cursor.fetchall()]

        whole_love_anime_id_set = set(chain(*anime_dict.values()))

        unlook_love_anime_id_set = whole_love_anime_id_set.difference(
            set(love_anime_id_list))
        unlook_love_anime_id_list = list(unlook_love_anime_id_set)

        random_anime_id = choice(unlook_love_anime_id_list)
        sql = 'select name, brief from anime where id = {}'.format(random_anime_id)

        cursor.execute(sql)
        name, brief = cursor.fetchall()[0]
        result = {'name': name, 'brief': brief}
        db.close()
        return result

if __name__ == '__main__':
    print(recommand(1))
