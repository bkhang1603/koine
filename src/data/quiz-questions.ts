export type Question = {
  question: string
  options: string[]
  correctAnswer: number
}

export const quizQuestions: Question[] = [
  // KHOA HỌC TỰ NHIÊN
  {
    question: 'Trái đất quay quanh mặt trời trong bao nhiêu ngày?',
    options: ['365 ngày', '360 ngày', '300 ngày', '400 ngày'],
    correctAnswer: 0
  },
  {
    question: 'Đâu không phải là một hành tinh trong hệ mặt trời?',
    options: ['Sao Thủy', 'Sao Mộc', 'Sao Thiên Vương', 'Mặt Trăng'],
    correctAnswer: 3
  },
  {
    question: 'Nước sẽ sôi ở nhiệt độ bao nhiêu độ C?',
    options: ['90°C', '100°C', '110°C', '120°C'],
    correctAnswer: 1
  },
  {
    question: 'Cơ quan nào trong cơ thể người tạo ra insulin?',
    options: ['Gan', 'Thận', 'Tụy', 'Dạ dày'],
    correctAnswer: 2
  },
  {
    question: 'Loài động vật nào có thể nhìn được bằng gót chân?',
    options: ['Bướm', 'Ong', 'Ruồi', 'Muỗi'],
    correctAnswer: 0
  },
  {
    question: 'DNA là viết tắt của từ gì?',
    options: ['Digital Network Access', 'Deoxyribonucleic Acid', 'Dynamic Network Algorithm', 'Direct Neural Activity'],
    correctAnswer: 1
  },
  {
    question: 'Nguyên tố nào chiếm tỷ lệ cao nhất trong không khí?',
    options: ['Oxy', 'Nitơ', 'Carbon dioxide', 'Hydro'],
    correctAnswer: 1
  },
  {
    question: 'Tốc độ ánh sáng trong chân không là bao nhiêu?',
    options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '499,792 km/s'],
    correctAnswer: 0
  },

  // TOÁN HỌC
  {
    question: 'Kết quả của phép tính 15 × 6 là bao nhiêu?',
    options: ['80', '90', '85', '95'],
    correctAnswer: 1
  },
  {
    question: 'Số Pi (π) gần đúng bằng bao nhiêu?',
    options: ['3.14', '3.24', '3.34', '3.44'],
    correctAnswer: 0
  },
  {
    question: 'Tổng các góc trong tam giác bằng bao nhiêu độ?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1
  },
  {
    question: 'Căn bậc hai của 144 là bao nhiêu?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2
  },
  {
    question: 'Số nào là số nguyên tố?',
    options: ['1', '2', '4', '6'],
    correctAnswer: 1
  },

  // LỊCH SỬ
  {
    question: 'Ai là vị vua cuối cùng của triều đại nhà Nguyễn?',
    options: ['Bảo Đại', 'Khải Định', 'Duy Tân', 'Thành Thái'],
    correctAnswer: 0
  },
  {
    question: 'Cuộc kháng chiến chống Mỹ kết thúc vào năm nào?',
    options: ['1974', '1975', '1976', '1977'],
    correctAnswer: 1
  },
  {
    question: 'Khởi nghĩa Lam Sơn do ai lãnh đạo?',
    options: ['Lê Lợi', 'Nguyễn Huệ', 'Trần Hưng Đạo', 'Lý Thường Kiệt'],
    correctAnswer: 0
  },
  {
    question: 'Thủ đô Hà Nội được đổi tên từ Thăng Long vào triều đại nào?',
    options: ['Nhà Lý', 'Nhà Trần', 'Nhà Lê', 'Nhà Nguyễn'],
    correctAnswer: 3
  },

  // ĐỊA LÝ
  {
    question: 'Đâu là con sông dài nhất Việt Nam?',
    options: ['Sông Hồng', 'Sông Mê Kông', 'Sông Đồng Nai', 'Sông Đà'],
    correctAnswer: 1
  },
  {
    question: 'Tỉnh nào là cực Bắc của Việt Nam?',
    options: ['Lào Cai', 'Hà Giang', 'Cao Bằng', 'Lạng Sơn'],
    correctAnswer: 1
  },
  {
    question: 'Đảo lớn nhất Việt Nam là đảo nào?',
    options: ['Phú Quốc', 'Cát Bà', 'Côn Đảo', 'Lý Sơn'],
    correctAnswer: 0
  },

  // TIẾNG VIỆT
  {
    question: 'Từ nào sau đây là từ láy?',
    options: ['Xinh đẹp', 'Lấp lánh', 'Thông minh', 'Chăm chỉ'],
    correctAnswer: 1
  },
  {
    question: 'Câu "Yêu cho roi cho vọt" là thành ngữ hay tục ngữ?',
    options: ['Thành ngữ', 'Tục ngữ', 'Ca dao', 'Châm ngôn'],
    correctAnswer: 1
  },

  // TIẾNG ANH
  {
    question: 'What is the past tense of "go"?',
    options: ['Gone', 'Went', 'Going', 'Goed'],
    correctAnswer: 1
  },
  {
    question: 'Which word means the opposite of "happy"?',
    options: ['Sad', 'Angry', 'Tired', 'Scared'],
    correctAnswer: 0
  },

  // KHOA HỌC TỰ NHIÊN (tiếp)
  {
    question: 'Loài chim nào không thể bay?',
    options: ['Đà điểu', 'Chim cánh cụt', 'Gà', 'Tất cả đều đúng'],
    correctAnswer: 3
  },
  {
    question: 'Tim người có bao nhiêu ngăn?',
    options: ['2 ngăn', '3 ngăn', '4 ngăn', '5 ngăn'],
    correctAnswer: 2
  },
  {
    question: 'Nguyên tố nào là kim loại nhẹ nhất?',
    options: ['Nhôm', 'Sắt', 'Lithium', 'Natri'],
    correctAnswer: 2
  },

  // TOÁN HỌC (tiếp)
  {
    question: 'Hình nào có nhiều cạnh nhất?',
    options: ['Tam giác', 'Tứ giác', 'Lục giác', 'Bát giác'],
    correctAnswer: 3
  },
  {
    question: '25% của 200 là bao nhiêu?',
    options: ['25', '40', '50', '75'],
    correctAnswer: 2
  },
  {
    question: 'Số chẵn nhỏ nhất lớn hơn 100 là?',
    options: ['100', '101', '102', '110'],
    correctAnswer: 2
  },

  // LỊCH SỬ (tiếp)
  {
    question: 'Ai là người phát minh ra điện thoại?',
    options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Albert Einstein'],
    correctAnswer: 1
  },
  {
    question: 'Năm nào Việt Nam gia nhập ASEAN?',
    options: ['1995', '1996', '1997', '1998'],
    correctAnswer: 0
  },
  {
    question: 'Chiến tranh thế giới thứ hai kết thúc vào năm nào?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1
  },

  // ĐỊA LÝ (tiếp)
  {
    question: 'Quốc gia nào có diện tích lớn nhất thế giới?',
    options: ['Mỹ', 'Trung Quốc', 'Canada', 'Nga'],
    correctAnswer: 3
  },
  {
    question: 'Đâu là sa mạc lớn nhất thế giới?',
    options: ['Sahara', 'Gobi', 'Arabian', 'Kalahari'],
    correctAnswer: 0
  },
  {
    question: 'Đỉnh núi cao nhất Việt Nam là gì?',
    options: ['Phan Xi Păng', 'Putaleng', 'Ngọc Linh', 'Tà Chì Nhù'],
    correctAnswer: 0
  },

  // VĂN HỌC
  {
    question: 'Ai là tác giả của "Truyện Kiều"?',
    options: ['Nguyễn Du', 'Nguyễn Trãi', 'Hồ Xuân Hương', 'Nguyễn Đình Chiểu'],
    correctAnswer: 0
  },
  {
    question: '"Số đỏ" là tác phẩm của ai?',
    options: ['Nam Cao', 'Ngô Tất Tố', 'Vũ Trọng Phụng', 'Nguyễn Công Hoan'],
    correctAnswer: 2
  },
  {
    question: 'Tác phẩm "Chí Phèo" của tác giả nào?',
    options: ['Nam Cao', 'Ngô Tất Tố', 'Vũ Trọng Phụng', 'Nguyễn Công Hoan'],
    correctAnswer: 0
  },

  // CÔNG NGHỆ
  {
    question: 'Đơn vị đo dung lượng nào lớn nhất?',
    options: ['Megabyte', 'Gigabyte', 'Terabyte', 'Petabyte'],
    correctAnswer: 3
  },
  {
    question: 'Ai là người sáng lập Facebook?',
    options: ['Bill Gates', 'Mark Zuckerberg', 'Steve Jobs', 'Elon Musk'],
    correctAnswer: 1
  },
  {
    question: 'WWW là viết tắt của cụm từ nào?',
    options: ['World Wide Web', 'World Web Width', 'Wide World Web', 'Web World Wide'],
    correctAnswer: 0
  },

  // THỂ THAO
  {
    question: 'Một trận bóng đá chính thức kéo dài bao nhiêu phút?',
    options: ['80 phút', '85 phút', '90 phút', '95 phút'],
    correctAnswer: 2
  },
  {
    question: 'Môn thể thao nào không sử dụng bóng?',
    options: ['Bóng bàn', 'Bóng chuyền', 'Cầu lông', 'Bóng rổ'],
    correctAnswer: 2
  },
  {
    question: 'Olympic được tổ chức mấy năm một lần?',
    options: ['2 năm', '3 năm', '4 năm', '5 năm'],
    correctAnswer: 2
  },

  // NGHỆ THUẬT
  {
    question: 'Bức tranh Mona Lisa được vẽ bởi ai?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
    correctAnswer: 1
  },
  {
    question: 'Nhạc cụ nào thuộc bộ dây?',
    options: ['Sáo', 'Trống', 'Đàn violin', 'Kèn trumpet'],
    correctAnswer: 2
  },
  {
    question: 'Màu nào là màu cơ bản?',
    options: ['Xanh lá', 'Cam', 'Tím', 'Đỏ'],
    correctAnswer: 3
  }

  // ... Tôi sẽ tiếp tục thêm 50 câu nữa nếu bạn muốn
]
