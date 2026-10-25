/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.

const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// Một <li> có khớp từ khoá không (tìm trong h3 và p, không phân biệt hoa thường).
function khopTuKhoa(muc, tuKhoa) {
	const vanBan = muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent;
	return vanBan.toLowerCase().includes(tuKhoa.toLowerCase());
}

// Ẩn/hiện từng tin theo từ khoá, rồi cập nhật bộ đếm và thông báo không tìm thấy.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const dsMuc = dsTin.querySelectorAll("li");
	let soHien = 0;
	for (const muc of dsMuc) {
		const khop = khopTuKhoa(muc, tuKhoa);
		muc.classList.toggle("an", !khop);
		if (khop) {
			soHien++;
		}
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${dsMuc.length} tin`;
	if (soHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
}

oTimKiem.addEventListener("keyup", locTin);

dsTin.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return;
	}
	const doan = e.target.closest("li").querySelector("p");
	const dangMo = doan.classList.toggle("day-du");
	e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const muc = document.createElement("li");
	const ngay = document.createElement("span");
	const h3 = document.createElement("h3");
	const doan = document.createElement("p");
	const nut = document.createElement("button");
	ngay.className = "time";
	ngay.textContent = homNay();
	h3.textContent = tieuDe;
	doan.textContent = noiDung;
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	muc.append(ngay, h3, doan, nut);
	dsTin.prepend(muc);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

locTin();
