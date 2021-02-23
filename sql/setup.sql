-- ユーザー作成
create role todo_user login password 'todo_pass';
-- データベース作成
create database todo_db with owner = todo_user;
--データベース接続(切り替え)
\connect todo_db todo_user
todo_pass

-- テーブル作成
create table todo_items(
  id serial,
  title varchar(40),
  done_flg numeric(1) default 0,
  time_limit date
);



