# 3.1 Connecting to and Disconnecting from the Server

```//shell
shell> mysql -h host -u user -p
Enter password: ********

<!-- on the same machine that MySQL is running on, you can: -->
shell> mysql -u user -p 

<!-- quit: -->
mysql> QUIT
Bye
```

# 3.2 Entering Queries
```
<!-- Keywords may be entered in any lettercase -->
mysql> SELECT VERSION(), CURRENT_DATE;
+-----------+--------------+
| VERSION() | CURRENT_DATE |
+-----------+--------------+
| 8.0.16    | 2019-09-13   |
+-----------+--------------+
1 row in set (0.00 sec)

<!-- as a simple calculator -->

mysql> SELECT SIN(PI()/4), (4+1)*5;
+--------------------+---------+
| SIN(PI()/4)        | (4+1)*5 |
+--------------------+---------+
| 0.7071067811865475 |      25 |
+--------------------+---------+
1 row in set (0.00 sec)

<!-- end each one with a semicolon: -->
mysql> SELECT VERSION(); SELECT NOW();
+-----------+
| VERSION() |
+-----------+
| 8.0.16    |
+-----------+
1 row in set (0.00 sec)

+---------------------+
| NOW()               |
+---------------------+
| 2019-09-13 22:02:13 |
+---------------------+
1 row in set (0.00 sec)

<!-- Here is a simple multiple-line statement: -->

mysql> SELECT
    -> USER()
    -> ,
    -> CURRENT_DATE;

+----------------+--------------+
| user()         | current_date |
+----------------+--------------+
| root@localhost | 2019-09-13   |
+----------------+--------------+
1 row in set (0.00 sec)

<!--  cancel it by typing \c: -->
mysql> select 
    -> user()
    -> \c

```

the prompts you may see and summarizes:
---------------------------
Prompt |	Meaning
-------| ----------
mysql> |	Ready for new query
->	   | Waiting for next line of multiple-line query
'>	   | Waiting for next line, waiting for completion of a string that began with a single quote (')
">	   | Waiting for next line, waiting for completion of a string that began with a double quote (")
\`\>	   | Waiting for next line, waiting for completion of an identifier that began with a backtick (\`\)
/*>	   | Waiting for next line, waiting for completion of a comment that began with /*


# 3.3.1 Creating and Selecting a Database
```//sql
mysql> CREATE DATABASE menagerie;

<!-- if exist: ERROR 1007 (HY000): Can't create database 'menagerie'; database exists -->

mysql> USE menagerie
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

mysql> USE menagerie -A
Database changed


```

# 3.3.2 Creating a Table
```//shell
mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| event               |
| pet                 |
+---------------------+
2 rows in set (0.00 sec)

<!-- if none: Empty set (0.00 sec)
 -->

mysql> CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
       species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
<!-- To verify that your table was created the way you expected, use a DESCRIBE statement: -->

mysql> describe pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
6 rows in set (0.01 sec)
```

# 3.3.3 Loading Data into a Table
```//shell
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet;
<!-- ERROR 1148 (42000): The used command is not allowed with this MySQL version -->
```

# 3.3.4 Retrieving Information from a Table

```
SELECT what_to_select
FROM which_table
WHERE conditions_to_satisfy;
```
- m3.3.4.1 Selecting All Data:`mysql> SELECT * FROM pet;UPDATE pet SET birth = '1989-08-31' WHERE name = 'Bowser';`
- m3.3.4.2 Selecting Particular Rows:`mysql> SELECT * FROM pet WHERE name = 'Bowser';SELECT * FROM pet WHERE birth >= '1998-1-1';SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';SELECT * FROM pet WHERE species = 'snake' OR species = 'bird';SELECT * FROM pet WHERE (species = 'cat' AND sex = 'm') OR (species = 'dog' AND sex = 'f');`
- m3.3.4.3 Selecting Particular Columns:`mysql> SELECT name, birth FROM pet;SELECT DISTINCT owner FROM pet;SELECT name, species, birth FROM petWHERE species = 'dog' OR species = 'cat';`
- m3.3.4.4 Sorting Rows:`mysql> SELECT name, birth FROM pet ORDER BY birth DESC;`
- m3.3.4.5 Date Calculations:`SELECT name, birth, CURDATE(),TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age FROM pet;`
- m3.3.4.6 Working with NULL Values:`mysql> SELECT 1 IS NULL, 1 IS NOT NULL;`
- m3.3.4.7 Pattern Matching:`mysql> SELECT * FROM pet WHERE name LIKE 'b%';`
- m3.3.4.8 Counting Rows:`mysql> SELECT COUNT(*) FROM pet;`
- m3.3.4.9 Using More Than one Table:`mysql> CREATE TABLE event (name VARCHAR(20), date DATE,type VARCHAR(15), remark VARCHAR(255));`


# 3.4 Getting Information About Databases and Tables
```//shell
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| menagerie  |
+------------+
1 row in set (0.00 sec)

mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| event               |
| pet                 |
+---------------------+
2 rows in set (0.00 sec)

mysql> DESCRIBE pet;
```

# 3.5 Using mysql in Batch Mode


If you need to specify connection parameters on the command line, the command might look like this:
```
shell> mysql -h host -u user -p < batch-file
Enter password: ********
```

# 3.6 Examples of Common Queries
To create and populate the example table, use these statements:

```//mysql
CREATE TABLE shop (
    article INT UNSIGNED  DEFAULT '0000' NOT NULL,
    dealer  CHAR(20)      DEFAULT ''     NOT NULL,
    price   DECIMAL(16,2) DEFAULT '0.00' NOT NULL,
    PRIMARY KEY(article, dealer));
INSERT INTO shop VALUES
    (1,'A',3.45),(1,'B',3.99),(2,'A',10.99),(3,'B',1.45),
    (3,'C',1.69),(3,'D',1.25),(4,'D',19.95);

SELECT MAX(article) AS article FROM shop;

+---------+
| article |
+---------+
|       4 |
+---------+

SELECT MIn(article) AS article FROM shop;
+---------+
| article |
+---------+
|       1 |
+---------+
SELECT * FROM   shop WHERE  article=(SELECT MIN(article) FROM shop);
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       1 | A      |  3.45 |
|       1 | B      |  3.99 |
+---------+--------+-------+
<!-- 3.6.3 Maximum of Column per Group
 -->
SELECT article, MAX(price) AS price
FROM   shop
GROUP BY article
ORDER BY article;


SELECT article, dealer, price
FROM   shop s1
WHERE  price=(SELECT MAX(s2.price)
              FROM shop s2
              WHERE s1.article = s2.article)
ORDER BY article;
<!-- 3.6.5 Using User-Defined Variables
 -->

SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;
SELECT * FROM shop WHERE price=@min_price OR price=@max_price;
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       3 | D      |  1.25 |
|       4 | D      | 19.95 |
+---------+--------+-------+

```

