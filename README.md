## Config Project

> **Sass** `npm install --save-exact sass@1.48.0`

---

> **Bootstrap** `npm i --save-exact bootstrap@5.1.3 react-bootstrap@2.2.1`

---

### Config react router v5

> **react-router-dom**`npm i --save-exact react-router-dom@5.3.0`

---

### Config axios

> **axios**`npm i --save-exact axios@0.25.0`

### Config toastify

> **react-toastify** `npm i --save-exact react-toastify@8.1.0`

> [Config detail toastify](https://fkhadra.github.io/react-toastify/introduction)

---

### Config lodash

> **lodash** `npm i --save-exact lodash@4.17.21`

---

### Config Pagination from backend

> count : => đếm tổng số bản : sum users => Mục đích là đếm tổng số trang

> Total (size) : số lượng lấy ra (limit) => Mỗi một lần lấy ra bao nhiêu phần tử

> Page ? (offset) => Để biết rằng bạn đang ở trang bao nhiêu

> EX :

```SQL
SELECT * FROM User LIMIT 10 OFFSET 4;
```

> Câu lệnh SQL trên nghĩa là lấy ra 10 phần tử tử table `User` và sẽ bắt đầu lấy từ phần tử thứ 5 trở đi

> EX :

> có 30 rows , 1 page có 5 rows => Tổng là 6 pages

> 1,2,3,4,5,6

> vào page 1 : lấy kết quả từ row 1 -> row 5

> vào page 2 : lấy kết quả từ row 6 -> row 10

> vào page 3 : lấy kết quả từ row 11 -> row 15

> ...

> vào page 6 : lấy kết quả từ row 26 -> row 30

> EX : Muốn lấy kết quả từ page thứ 3 thì ta dùng câu lệnh SQL như sau

```SQL
SELECT * FROM User LIMIT 5 OFFSET 10;
```

> Điều này có nghĩa là sẽ lấy giới hạn 5 row và sẽ lấy từ phần từ thứ 11 trở đi

> EX : Tương tự nếu lấy kết quả từ trang 6

```SQL
SELECT * FROM User LIMIT 5 OFFSET 25;
```

> Điều này có nghĩa là sẽ lấy giới hạn 5 row và sẽ lấy từ phần từ thứ 26 trở đi

---

> **_Rút ra kết luận và công thức khi phân trang_**

> Mỗi một lần muốn đổi trang thì cần tính lại thằng `offset`

> Công thức tính `offset` = (`page hiện tại` - `1`) X `số phần tử mỗi page`

> EX : Ví dụ đang ở `page 2` : `offset = ( 2 - 1 ) X 5 = 5`

> Công thức tính tổng cộng `có bao nhiêu page`

> Lấy tổng số items count được , chính là tổng số User trong table chia cho limit

> EX : Tổng User là 30 => `Total Pages = (30/5) = 6`

> Và JS có hàm Math.ceil() để làm tròn số để tính tổng số page nếu là số lẻ
> Ví dụ 3.14 làm tròn thành 4

`Math.ceil(30/5)`

### Sequelize có hỗ trợ method findAndCountAll để tính limit và offset

### [model-querying-finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

## Config react-paginate npm for frontend

### [react-paginate](https://www.npmjs.com/package/react-paginate)

> npm i --save-exact react-paginate@8.1.0

---

## Config font awesome v4.7.0

> npm i --save-exact font-awesome@4.7.0

> import 'font-awesome/css/font-awesome.min.css' at file index in reactjs;

## [How to write readme file ?](https://ihoctot.com/cach-viet-readme-md)
