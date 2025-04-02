// Dữ liệu đầy đủ về tỉnh/thành phố, quận/huyện, phường/xã của Việt Nam
export const VIETNAM_PROVINCES = [
  {
    code: '01',
    name: 'Thành phố Hà Nội',
    districts: [
      {
        code: '001',
        name: 'Quận Ba Đình',
        wards: [
          { code: '00001', name: 'Phường Phúc Xá' },
          { code: '00004', name: 'Phường Trúc Bạch' },
          { code: '00006', name: 'Phường Vĩnh Phúc' },
          { code: '00007', name: 'Phường Cống Vị' },
          { code: '00008', name: 'Phường Liễu Giai' },
          { code: '00010', name: 'Phường Nguyễn Trung Trực' },
          { code: '00013', name: 'Phường Quán Thánh' },
          { code: '00016', name: 'Phường Ngọc Hà' },
          { code: '00019', name: 'Phường Điện Biên' },
          { code: '00022', name: 'Phường Đội Cấn' },
          { code: '00025', name: 'Phường Ngọc Khánh' },
          { code: '00028', name: 'Phường Kim Mã' },
          { code: '00031', name: 'Phường Giảng Võ' },
          { code: '00034', name: 'Phường Thành Công' }
        ]
      },
      {
        code: '002',
        name: 'Quận Hoàn Kiếm',
        wards: [
          { code: '00037', name: 'Phường Phúc Tân' },
          { code: '00040', name: 'Phường Đồng Xuân' },
          { code: '00043', name: 'Phường Hàng Mã' },
          { code: '00046', name: 'Phường Hàng Buồm' },
          { code: '00049', name: 'Phường Hàng Đào' },
          { code: '00052', name: 'Phường Hàng Bồ' },
          { code: '00055', name: 'Phường Cửa Đông' },
          { code: '00058', name: 'Phường Lý Thái Tổ' },
          { code: '00061', name: 'Phường Hàng Bạc' },
          { code: '00064', name: 'Phường Hàng Gai' },
          { code: '00067', name: 'Phường Chương Dương' },
          { code: '00070', name: 'Phường Hàng Trống' },
          { code: '00073', name: 'Phường Cửa Nam' },
          { code: '00076', name: 'Phường Hàng Bông' },
          { code: '00079', name: 'Phường Tràng Tiền' },
          { code: '00082', name: 'Phường Trần Hưng Đạo' },
          { code: '00085', name: 'Phường Phan Chu Trinh' },
          { code: '00088', name: 'Phường Hàng Bài' }
        ]
      },
      {
        code: '003',
        name: 'Quận Tây Hồ',
        wards: [
          { code: '00091', name: 'Phường Phú Thượng' },
          { code: '00094', name: 'Phường Nhật Tân' },
          { code: '00097', name: 'Phường Tứ Liên' },
          { code: '00100', name: 'Phường Quảng An' },
          { code: '00103', name: 'Phường Xuân La' },
          { code: '00106', name: 'Phường Yên Phụ' },
          { code: '00109', name: 'Phường Bưởi' },
          { code: '00112', name: 'Phường Thụy Khuê' }
        ]
      },
      {
        code: '004',
        name: 'Quận Long Biên',
        wards: [
          { code: '00115', name: 'Phường Thượng Thanh' },
          { code: '00118', name: 'Phường Ngọc Thụy' },
          { code: '00121', name: 'Phường Giang Biên' },
          { code: '00124', name: 'Phường Đức Giang' },
          { code: '00127', name: 'Phường Việt Hưng' },
          { code: '00130', name: 'Phường Gia Thụy' },
          { code: '00133', name: 'Phường Ngọc Lâm' },
          { code: '00136', name: 'Phường Phúc Lợi' },
          { code: '00139', name: 'Phường Bồ Đề' },
          { code: '00142', name: 'Phường Sài Đồng' },
          { code: '00145', name: 'Phường Long Biên' },
          { code: '00148', name: 'Phường Thạch Bàn' },
          { code: '00151', name: 'Phường Phúc Đồng' },
          { code: '00154', name: 'Phường Cự Khối' }
        ]
      },
      {
        code: '005',
        name: 'Quận Cầu Giấy',
        wards: [
          { code: '00157', name: 'Phường Nghĩa Đô' },
          { code: '00160', name: 'Phường Nghĩa Tân' },
          { code: '00163', name: 'Phường Mai Dịch' },
          { code: '00166', name: 'Phường Dịch Vọng' },
          { code: '00167', name: 'Phường Dịch Vọng Hậu' },
          { code: '00169', name: 'Phường Quan Hoa' },
          { code: '00172', name: 'Phường Yên Hoà' },
          { code: '00175', name: 'Phường Trung Hoà' }
        ]
      },
      {
        code: '006',
        name: 'Quận Đống Đa',
        wards: [
          { code: '00178', name: 'Phường Cát Linh' },
          { code: '00181', name: 'Phường Văn Miếu' },
          { code: '00184', name: 'Phường Quốc Tử Giám' },
          { code: '00187', name: 'Phường Láng Thượng' },
          { code: '00190', name: 'Phường Ô Chợ Dừa' },
          { code: '00193', name: 'Phường Văn Chương' },
          { code: '00196', name: 'Phường Hàng Bột' },
          { code: '00199', name: 'Phường Láng Hạ' },
          { code: '00202', name: 'Phường Khâm Thiên' },
          { code: '00205', name: 'Phường Thổ Quan' },
          { code: '00208', name: 'Phường Nam Đồng' },
          { code: '00211', name: 'Phường Trung Phụng' },
          { code: '00214', name: 'Phường Quang Trung' },
          { code: '00217', name: 'Phường Trung Liệt' },
          { code: '00220', name: 'Phường Phương Liên' },
          { code: '00223', name: 'Phường Thịnh Quang' },
          { code: '00226', name: 'Phường Trung Tự' },
          { code: '00229', name: 'Phường Kim Liên' },
          { code: '00232', name: 'Phường Phương Mai' },
          { code: '00235', name: 'Phường Ngã Tư Sở' },
          { code: '00238', name: 'Phường Khương Thượng' }
        ]
      },
      {
        code: '007',
        name: 'Quận Hai Bà Trưng',
        wards: [
          { code: '00241', name: 'Phường Nguyễn Du' },
          { code: '00244', name: 'Phường Bạch Đằng' },
          { code: '00247', name: 'Phường Phạm Đình Hổ' },
          { code: '00250', name: 'Phường Lê Đại Hành' },
          { code: '00253', name: 'Phường Đồng Nhân' },
          { code: '00256', name: 'Phường Phố Huế' },
          { code: '00259', name: 'Phường Đống Mác' },
          { code: '00262', name: 'Phường Thanh Lương' },
          { code: '00265', name: 'Phường Thanh Nhàn' },
          { code: '00268', name: 'Phường Cầu Dền' },
          { code: '00271', name: 'Phường Bách Khoa' },
          { code: '00274', name: 'Phường Đồng Tâm' },
          { code: '00277', name: 'Phường Vĩnh Tuy' },
          { code: '00280', name: 'Phường Bạch Mai' },
          { code: '00283', name: 'Phường Quỳnh Mai' },
          { code: '00286', name: 'Phường Quỳnh Lôi' },
          { code: '00289', name: 'Phường Minh Khai' },
          { code: '00292', name: 'Phường Trương Định' }
        ]
      },
      {
        code: '008',
        name: 'Quận Hoàng Mai',
        wards: [
          { code: '00295', name: 'Phường Thanh Trì' },
          { code: '00298', name: 'Phường Vĩnh Hưng' },
          { code: '00301', name: 'Phường Định Công' },
          { code: '00304', name: 'Phường Mai Động' },
          { code: '00307', name: 'Phường Tương Mai' },
          { code: '00310', name: 'Phường Đại Kim' },
          { code: '00313', name: 'Phường Tân Mai' },
          { code: '00316', name: 'Phường Hoàng Văn Thụ' },
          { code: '00319', name: 'Phường Giáp Bát' },
          { code: '00322', name: 'Phường Lĩnh Nam' },
          { code: '00325', name: 'Phường Thịnh Liệt' },
          { code: '00328', name: 'Phường Trần Phú' },
          { code: '00331', name: 'Phường Hoàng Liệt' },
          { code: '00334', name: 'Phường Yên Sở' }
        ]
      },
      {
        code: '009',
        name: 'Quận Thanh Xuân',
        wards: [
          { code: '00337', name: 'Phường Nhân Chính' },
          { code: '00340', name: 'Phường Thượng Đình' },
          { code: '00343', name: 'Phường Khương Trung' },
          { code: '00346', name: 'Phường Khương Mai' },
          { code: '00349', name: 'Phường Thanh Xuân Trung' },
          { code: '00352', name: 'Phường Phương Liệt' },
          { code: '00355', name: 'Phường Hạ Đình' },
          { code: '00358', name: 'Phường Khương Đình' },
          { code: '00361', name: 'Phường Thanh Xuân Bắc' },
          { code: '00364', name: 'Phường Thanh Xuân Nam' },
          { code: '00367', name: 'Phường Kim Giang' }
        ]
      },
      {
        code: '016',
        name: 'Huyện Sóc Sơn',
        wards: [
          { code: '00370', name: 'Thị trấn Sóc Sơn' },
          { code: '00373', name: 'Xã Bắc Sơn' },
          { code: '00376', name: 'Xã Minh Trí' },
          { code: '00379', name: 'Xã Hồng Kỳ' },
          { code: '00382', name: 'Xã Nam Sơn' },
          { code: '00385', name: 'Xã Trung Giã' },
          { code: '00388', name: 'Xã Tân Hưng' },
          { code: '00391', name: 'Xã Minh Phú' },
          { code: '00394', name: 'Xã Phù Linh' },
          { code: '00397', name: 'Xã Bắc Phú' },
          { code: '00400', name: 'Xã Tân Minh' },
          { code: '00403', name: 'Xã Quang Tiến' },
          { code: '00406', name: 'Xã Hiền Ninh' },
          { code: '00409', name: 'Xã Tân Dân' },
          { code: '00412', name: 'Xã Tiên Dược' },
          { code: '00415', name: 'Xã Việt Long' },
          { code: '00418', name: 'Xã Xuân Giang' },
          { code: '00421', name: 'Xã Mai Đình' },
          { code: '00424', name: 'Xã Đức Hoà' },
          { code: '00427', name: 'Xã Thanh Xuân' },
          { code: '00430', name: 'Xã Đông Xuân' },
          { code: '00433', name: 'Xã Kim Lũ' },
          { code: '00436', name: 'Xã Phú Cường' },
          { code: '00439', name: 'Xã Phú Minh' },
          { code: '00442', name: 'Xã Phù Lỗ' },
          { code: '00445', name: 'Xã Xuân Thu' }
        ]
      },
      {
        code: '017',
        name: 'Huyện Đông Anh',
        wards: [
          { code: '00448', name: 'Thị trấn Đông Anh' },
          { code: '00451', name: 'Xã Xuân Nộn' },
          { code: '00454', name: 'Xã Thuỵ Lâm' },
          { code: '00457', name: 'Xã Bắc Hồng' },
          { code: '00460', name: 'Xã Nguyên Khê' },
          { code: '00463', name: 'Xã Nam Hồng' },
          { code: '00466', name: 'Xã Tiên Dương' },
          { code: '00469', name: 'Xã Vân Hà' },
          { code: '00472', name: 'Xã Uy Nỗ' },
          { code: '00475', name: 'Xã Vân Nội' },
          { code: '00478', name: 'Xã Liên Hà' },
          { code: '00481', name: 'Xã Việt Hùng' },
          { code: '00484', name: 'Xã Kim Nỗ' },
          { code: '00487', name: 'Xã Kim Chung' },
          { code: '00490', name: 'Xã Dục Tú' },
          { code: '00493', name: 'Xã Đại Mạch' },
          { code: '00496', name: 'Xã Vĩnh Ngọc' },
          { code: '00499', name: 'Xã Cổ Loa' },
          { code: '00502', name: 'Xã Hải Bối' },
          { code: '00505', name: 'Xã Xuân Canh' },
          { code: '00508', name: 'Xã Võng La' },
          { code: '00511', name: 'Xã Tàm Xá' },
          { code: '00514', name: 'Xã Mai Lâm' },
          { code: '00517', name: 'Xã Đông Hội' }
        ]
      },
      {
        code: '018',
        name: 'Huyện Gia Lâm',
        wards: [
          { code: '00520', name: 'Thị trấn Yên Viên' },
          { code: '00523', name: 'Xã Yên Thường' },
          { code: '00526', name: 'Xã Yên Viên' },
          { code: '00529', name: 'Xã Ninh Hiệp' },
          { code: '00532', name: 'Xã Đình Xuyên' },
          { code: '00535', name: 'Xã Dương Hà' },
          { code: '00538', name: 'Xã Phù Đổng' },
          { code: '00541', name: 'Xã Trung Mầu' },
          { code: '00544', name: 'Xã Lệ Chi' },
          { code: '00547', name: 'Xã Cổ Bi' },
          { code: '00550', name: 'Xã Đặng Xá' },
          { code: '00553', name: 'Xã Phú Thị' },
          { code: '00556', name: 'Xã Kim Sơn' },
          { code: '00559', name: 'Thị trấn Trâu Quỳ' },
          { code: '00562', name: 'Xã Dương Quang' },
          { code: '00565', name: 'Xã Dương Xá' },
          { code: '00568', name: 'Xã Đông Dư' },
          { code: '00571', name: 'Xã Đa Tốn' },
          { code: '00574', name: 'Xã Kiêu Kỵ' },
          { code: '00577', name: 'Xã Bát Tràng' },
          { code: '00580', name: 'Xã Kim Lan' },
          { code: '00583', name: 'Xã Văn Đức' }
        ]
      },
      {
        code: '019',
        name: 'Quận Nam Từ Liêm',
        wards: [
          { code: '00586', name: 'Phường Cầu Diễn' },
          { code: '00589', name: 'Phường Xuân Phương' },
          { code: '00592', name: 'Phường Phương Canh' },
          { code: '00595', name: 'Phường Mỹ Đình 1' },
          { code: '00598', name: 'Phường Mỹ Đình 2' },
          { code: '00601', name: 'Phường Tây Mỗ' },
          { code: '00604', name: 'Phường Mễ Trì' },
          { code: '00607', name: 'Phường Phú Đô' },
          { code: '00610', name: 'Phường Đại Mỗ' },
          { code: '00613', name: 'Phường Trung Văn' }
        ]
      },
      {
        code: '020',
        name: 'Huyện Thanh Trì',
        wards: [
          { code: '00616', name: 'Thị trấn Văn Điển' },
          { code: '00619', name: 'Xã Tân Triều' },
          { code: '00622', name: 'Xã Thanh Liệt' },
          { code: '00625', name: 'Xã Tả Thanh Oai' },
          { code: '00628', name: 'Xã Hữu Hoà' },
          { code: '00631', name: 'Xã Tam Hiệp' },
          { code: '00634', name: 'Xã Tứ Hiệp' },
          { code: '00637', name: 'Xã Yên Mỹ' },
          { code: '00640', name: 'Xã Vĩnh Quỳnh' },
          { code: '00643', name: 'Xã Ngũ Hiệp' },
          { code: '00646', name: 'Xã Duyên Hà' },
          { code: '00649', name: 'Xã Ngọc Hồi' },
          { code: '00652', name: 'Xã Vạn Phúc' },
          { code: '00655', name: 'Xã Đại áng' },
          { code: '00658', name: 'Xã Liên Ninh' },
          { code: '00661', name: 'Xã Đông Mỹ' }
        ]
      },
      {
        code: '021',
        name: 'Quận Bắc Từ Liêm',
        wards: [
          { code: '00664', name: 'Phường Thượng Cát' },
          { code: '00667', name: 'Phường Liên Mạc' },
          { code: '00670', name: 'Phường Đông Ngạc' },
          { code: '00673', name: 'Phường Đức Thắng' },
          { code: '00676', name: 'Phường Thụy Phương' },
          { code: '00679', name: 'Phường Tây Tựu' },
          { code: '00682', name: 'Phường Xuân Đỉnh' },
          { code: '00685', name: 'Phường Xuân Tảo' },
          { code: '00688', name: 'Phường Minh Khai' },
          { code: '00691', name: 'Phường Cổ Nhuế 1' },
          { code: '00694', name: 'Phường Cổ Nhuế 2' },
          { code: '00697', name: 'Phường Phú Diễn' },
          { code: '00700', name: 'Phường Phúc Diễn' }
        ]
      },
      {
        code: '250',
        name: 'Huyện Mê Linh',
        wards: [
          { code: '08973', name: 'Thị trấn Chi Đông' },
          { code: '08974', name: 'Xã Đại Thịnh' },
          { code: '08976', name: 'Xã Kim Hoa' },
          { code: '08979', name: 'Xã Thạch Đà' },
          { code: '08982', name: 'Xã Tiến Thắng' },
          { code: '08985', name: 'Xã Tự Lập' },
          { code: '08988', name: 'Thị trấn Quang Minh' },
          { code: '08991', name: 'Xã Thanh Lâm' },
          { code: '08994', name: 'Xã Tam Đồng' },
          { code: '08997', name: 'Xã Liên Mạc' },
          { code: '09000', name: 'Xã Vạn Yên' },
          { code: '09003', name: 'Xã Chu Phan' },
          { code: '09006', name: 'Xã Tiến Thịnh' },
          { code: '09009', name: 'Xã Mê Linh' },
          { code: '09012', name: 'Xã Văn Khê' },
          { code: '09015', name: 'Xã Hoàng Kim' },
          { code: '09018', name: 'Xã Tiền Phong' },
          { code: '09021', name: 'Xã Tráng Việt' }
        ]
      },
      {
        code: '268',
        name: 'Quận Hà Đông',
        wards: [
          { code: '09538', name: 'Phường Nguyễn Trãi' },
          { code: '09541', name: 'Phường Mộ Lao' },
          { code: '09544', name: 'Phường Văn Quán' },
          { code: '09547', name: 'Phường Vạn Phúc' },
          { code: '09550', name: 'Phường Yết Kiêu' },
          { code: '09553', name: 'Phường Quang Trung' },
          { code: '09556', name: 'Phường La Khê' },
          { code: '09559', name: 'Phường Phú La' },
          { code: '09562', name: 'Phường Phúc La' },
          { code: '09565', name: 'Phường Hà Cầu' },
          { code: '09568', name: 'Phường Yên Nghĩa' },
          { code: '09571', name: 'Phường Kiến Hưng' },
          { code: '09574', name: 'Phường Phú Lãm' },
          { code: '09577', name: 'Phường Phú Lương' },
          { code: '09580', name: 'Phường Dương Nội' },
          { code: '09886', name: 'Phường Đồng Mai' },
          { code: '09895', name: 'Phường Biên Giang' }
        ]
      },
      {
        code: '269',
        name: 'Thị xã Sơn Tây',
        wards: [
          { code: '09583', name: 'Phường Lê Lợi' },
          { code: '09586', name: 'Phường Phú Thịnh' },
          { code: '09589', name: 'Phường Ngô Quyền' },
          { code: '09592', name: 'Phường Quang Trung' },
          { code: '09595', name: 'Phường Sơn Lộc' },
          { code: '09598', name: 'Phường Xuân Khanh' },
          { code: '09601', name: 'Xã Đường Lâm' },
          { code: '09604', name: 'Phường Viên Sơn' },
          { code: '09607', name: 'Xã Xuân Sơn' },
          { code: '09610', name: 'Xã Trung Hưng' },
          { code: '09613', name: 'Xã Thanh Mỹ' },
          { code: '09616', name: 'Phường Trung Sơn Trầm' },
          { code: '09619', name: 'Xã Kim Sơn' },
          { code: '09622', name: 'Xã Sơn Đông' },
          { code: '09625', name: 'Xã Cổ Đông' }
        ]
      },
      {
        code: '271',
        name: 'Huyện Ba Vì',
        wards: [
          { code: '09628', name: 'Thị trấn Tây Đằng' },
          { code: '09631', name: 'Xã Phú Cường' },
          { code: '09634', name: 'Xã Cổ Đô' },
          { code: '09637', name: 'Xã Tản Hồng' },
          { code: '09640', name: 'Xã Vạn Thắng' },
          { code: '09643', name: 'Xã Châu Sơn' },
          { code: '09646', name: 'Xã Phong Vân' },
          { code: '09649', name: 'Xã Phú Đông' },
          { code: '09652', name: 'Xã Phú Phương' },
          { code: '09655', name: 'Xã Phú Châu' },
          { code: '09658', name: 'Xã Thái Hòa' },
          { code: '09661', name: 'Xã Đồng Thái' },
          { code: '09664', name: 'Xã Phú Sơn' },
          { code: '09667', name: 'Xã Minh Châu' },
          { code: '09670', name: 'Xã Vật Lại' },
          { code: '09673', name: 'Xã Chu Minh' },
          { code: '09676', name: 'Xã Tòng Bạt' },
          { code: '09679', name: 'Xã Cẩm Lĩnh' },
          { code: '09682', name: 'Xã Sơn Đà' },
          { code: '09685', name: 'Xã Đông Quang' },
          { code: '09688', name: 'Xã Tiên Phong' },
          { code: '09691', name: 'Xã Thụy An' },
          { code: '09694', name: 'Xã Cam Thượng' },
          { code: '09697', name: 'Xã Thuần Mỹ' },
          { code: '09700', name: 'Xã Tản Lĩnh' },
          { code: '09703', name: 'Xã Ba Trại' },
          { code: '09706', name: 'Xã Minh Quang' },
          { code: '09709', name: 'Xã Ba Vì' },
          { code: '09712', name: 'Xã Vân Hòa' },
          { code: '09715', name: 'Xã Yên Bài' },
          { code: '09718', name: 'Xã Khánh Thượng' }
        ]
      },
      {
        code: '272',
        name: 'Huyện Phúc Thọ',
        wards: [
          { code: '09721', name: 'Thị trấn Phúc Thọ' },
          { code: '09724', name: 'Xã Vân Hà' },
          { code: '09727', name: 'Xã Vân Phúc' },
          { code: '09730', name: 'Xã Vân Nam' },
          { code: '09733', name: 'Xã Xuân Đình' },
          { code: '09739', name: 'Xã Sen Phương' },
          { code: '09745', name: 'Xã Võng Xuyên' },
          { code: '09748', name: 'Xã Thọ Lộc' },
          { code: '09751', name: 'Xã Long Xuyên' },
          { code: '09754', name: 'Xã Thượng Cốc' },
          { code: '09757', name: 'Xã Hát Môn' },
          { code: '09760', name: 'Xã Tích Giang' },
          { code: '09763', name: 'Xã Thanh Đa' },
          { code: '09766', name: 'Xã Trạch Mỹ Lộc' },
          { code: '09769', name: 'Xã Phúc Hòa' },
          { code: '09772', name: 'Xã Ngọc Tảo' },
          { code: '09775', name: 'Xã Phụng Thượng' },
          { code: '09778', name: 'Xã Tam Thuấn' },
          { code: '09781', name: 'Xã Tam Hiệp' },
          { code: '09784', name: 'Xã Hiệp Thuận' },
          { code: '09787', name: 'Xã Liên Hiệp' }
        ]
      },
      {
        code: '273',
        name: 'Huyện Đan Phượng',
        wards: [
          { code: '09790', name: 'Thị trấn Phùng' },
          { code: '09793', name: 'Xã Trung Châu' },
          { code: '09796', name: 'Xã Thọ An' },
          { code: '09799', name: 'Xã Thọ Xuân' },
          { code: '09802', name: 'Xã Hồng Hà' },
          { code: '09805', name: 'Xã Liên Hồng' },
          { code: '09808', name: 'Xã Liên Hà' },
          { code: '09811', name: 'Xã Hạ Mỗ' },
          { code: '09814', name: 'Xã Liên Trung' },
          { code: '09817', name: 'Xã Phương Đình' },
          { code: '09820', name: 'Xã Thượng Mỗ' },
          { code: '09823', name: 'Xã Tân Hội' },
          { code: '09826', name: 'Xã Tân Lập' },
          { code: '09829', name: 'Xã Đan Phượng' },
          { code: '09832', name: 'Xã Đồng Tháp' },
          { code: '09835', name: 'Xã Song Phượng' }
        ]
      },
      {
        code: '274',
        name: 'Huyện Hoài Đức',
        wards: [
          { code: '09838', name: 'Thị trấn Trạm Trôi' },
          { code: '09841', name: 'Xã Đức Thượng' },
          { code: '09844', name: 'Xã Minh Khai' },
          { code: '09847', name: 'Xã Dương Liễu' },
          { code: '09850', name: 'Xã Di Trạch' },
          { code: '09853', name: 'Xã Đức Giang' },
          { code: '09856', name: 'Xã Cát Quế' },
          { code: '09859', name: 'Xã Kim Chung' },
          { code: '09862', name: 'Xã Yên Sở' },
          { code: '09865', name: 'Xã Sơn Đồng' },
          { code: '09868', name: 'Xã Vân Canh' },
          { code: '09871', name: 'Xã Đắc Sở' },
          { code: '09874', name: 'Xã Lại Yên' },
          { code: '09877', name: 'Xã Tiền Yên' },
          { code: '09880', name: 'Xã Song Phương' },
          { code: '09883', name: 'Xã An Khánh' },
          { code: '09889', name: 'Xã An Thượng' },
          { code: '09892', name: 'Xã Vân Côn' },
          { code: '09901', name: 'Xã La Phù' },
          { code: '09904', name: 'Xã Đông La' }
        ]
      },
      {
        code: '275',
        name: 'Huyện Quốc Oai',
        wards: [
          { code: '09907', name: 'Thị trấn Quốc Oai' },
          { code: '09910', name: 'Xã Sài Sơn' },
          { code: '09913', name: 'Xã Phượng Cách' },
          { code: '09916', name: 'Xã Yên Sơn' },
          { code: '09919', name: 'Xã Ngọc Liệp' },
          { code: '09922', name: 'Xã Ngọc Mỹ' },
          { code: '09925', name: 'Xã Liệp Tuyết' },
          { code: '09928', name: 'Xã Thạch Thán' },
          { code: '09931', name: 'Xã Đồng Quang' },
          { code: '09934', name: 'Xã Phú Cát' },
          { code: '09937', name: 'Xã Tuyết Nghĩa' },
          { code: '09940', name: 'Xã Nghĩa Hương' },
          { code: '09943', name: 'Xã Cộng Hòa' },
          { code: '09946', name: 'Xã Tân Phú' },
          { code: '09949', name: 'Xã Đại Thành' },
          { code: '09952', name: 'Xã Phú Mãn' },
          { code: '09955', name: 'Xã Cấn Hữu' },
          { code: '09958', name: 'Xã Tân Hòa' },
          { code: '09961', name: 'Xã Hòa Thạch' },
          { code: '09964', name: 'Xã Đông Yên' }
        ]
      },
      {
        code: '276',
        name: 'Huyện Thạch Thất',
        wards: [
          { code: '09970', name: 'Xã Yên Trung' },
          { code: '09973', name: 'Xã Yên Bình' },
          { code: '09976', name: 'Xã Tiến Xuân' },
          { code: '09979', name: 'Thị trấn Liên Quan' },
          { code: '09982', name: 'Xã Đại Đồng' },
          { code: '09985', name: 'Xã Cẩm Yên' },
          { code: '09988', name: 'Xã Lại Thượng' },
          { code: '09991', name: 'Xã Phú Kim' },
          { code: '09994', name: 'Xã Hương Ngải' },
          { code: '09997', name: 'Xã Canh Nậu' },
          { code: '10000', name: 'Xã Kim Quan' },
          { code: '10003', name: 'Xã Dị Nậu' },
          { code: '10006', name: 'Xã Bình Yên' },
          { code: '10009', name: 'Xã Chàng Sơn' },
          { code: '10012', name: 'Xã Thạch Hoà' },
          { code: '10015', name: 'Xã Cần Kiệm' },
          { code: '10018', name: 'Xã Hữu Bằng' },
          { code: '10021', name: 'Xã Phùng Xá' },
          { code: '10024', name: 'Xã Tân Xã' },
          { code: '10027', name: 'Xã Thạch Xá' },
          { code: '10030', name: 'Xã Bình Phú' },
          { code: '10033', name: 'Xã Hạ Bằng' },
          { code: '10036', name: 'Xã Đồng Trúc' }
        ]
      },
      {
        code: '277',
        name: 'Huyện Chương Mỹ',
        wards: [
          { code: '10039', name: 'Thị trấn Chúc Sơn' },
          { code: '10042', name: 'Thị trấn Xuân Mai' },
          { code: '10045', name: 'Xã Phụng Châu' },
          { code: '10048', name: 'Xã Tiên Phương' },
          { code: '10051', name: 'Xã Đông Sơn' },
          { code: '10054', name: 'Xã Đông Phương Yên' },
          { code: '10057', name: 'Xã Phú Nghĩa' },
          { code: '10063', name: 'Xã Trường Yên' },
          { code: '10066', name: 'Xã Ngọc Hòa' },
          { code: '10069', name: 'Xã Thủy Xuân Tiên' },
          { code: '10072', name: 'Xã Thanh Bình' },
          { code: '10075', name: 'Xã Trung Hòa' },
          { code: '10078', name: 'Xã Đại Yên' },
          { code: '10081', name: 'Xã Thụy Hương' },
          { code: '10084', name: 'Xã Tốt Động' },
          { code: '10087', name: 'Xã Lam Điền' },
          { code: '10090', name: 'Xã Tân Tiến' },
          { code: '10093', name: 'Xã Nam Phương Tiến' },
          { code: '10096', name: 'Xã Hợp Đồng' },
          { code: '10099', name: 'Xã Hoàng Văn Thụ' },
          { code: '10102', name: 'Xã Hoàng Diệu' },
          { code: '10105', name: 'Xã Hữu Văn' },
          { code: '10108', name: 'Xã Quảng Bị' },
          { code: '10111', name: 'Xã Mỹ Lương' },
          { code: '10114', name: 'Xã Thượng Vực' },
          { code: '10117', name: 'Xã Hồng Phong' },
          { code: '10120', name: 'Xã Đồng Phú' },
          { code: '10123', name: 'Xã Trần Phú' },
          { code: '10126', name: 'Xã Văn Võ' },
          { code: '10129', name: 'Xã Đồng Lạc' },
          { code: '10132', name: 'Xã Hòa Chính' },
          { code: '10135', name: 'Xã Phú Nam An' }
        ]
      },
      {
        code: '278',
        name: 'Huyện Thanh Oai',
        wards: [
          { code: '10138', name: 'Thị trấn Kim Bài' },
          { code: '10141', name: 'Xã Cự Khê' },
          { code: '10147', name: 'Xã Bích Hòa' },
          { code: '10150', name: 'Xã Mỹ Hưng' },
          { code: '10153', name: 'Xã Cao Viên' },
          { code: '10156', name: 'Xã Bình Minh' },
          { code: '10159', name: 'Xã Tam Hưng' },
          { code: '10162', name: 'Xã Thanh Cao' },
          { code: '10165', name: 'Xã Thanh Thùy' },
          { code: '10168', name: 'Xã Thanh Mai' },
          { code: '10171', name: 'Xã Thanh Văn' },
          { code: '10174', name: 'Xã Đỗ Động' },
          { code: '10177', name: 'Xã Kim An' },
          { code: '10180', name: 'Xã Kim Thư' },
          { code: '10183', name: 'Xã Phương Trung' },
          { code: '10186', name: 'Xã Tân Ước' },
          { code: '10189', name: 'Xã Dân Hòa' },
          { code: '10192', name: 'Xã Liên Châu' },
          { code: '10195', name: 'Xã Cao Dương' },
          { code: '10198', name: 'Xã Xuân Dương' },
          { code: '10201', name: 'Xã Hồng Dương' }
        ]
      },
      {
        code: '279',
        name: 'Huyện Thường Tín',
        wards: [
          { code: '10204', name: 'Thị trấn Thường Tín' },
          { code: '10207', name: 'Xã Ninh Sở' },
          { code: '10210', name: 'Xã Nhị Khê' },
          { code: '10213', name: 'Xã Duyên Thái' },
          { code: '10216', name: 'Xã Khánh Hà' },
          { code: '10219', name: 'Xã Hòa Bình' },
          { code: '10222', name: 'Xã Văn Bình' },
          { code: '10225', name: 'Xã Hiền Giang' },
          { code: '10228', name: 'Xã Hồng Vân' },
          { code: '10231', name: 'Xã Vân Tảo' },
          { code: '10234', name: 'Xã Liên Phương' },
          { code: '10237', name: 'Xã Văn Phú' },
          { code: '10240', name: 'Xã Tự Nhiên' },
          { code: '10243', name: 'Xã Tiền Phong' },
          { code: '10246', name: 'Xã Hà Hồi' },
          { code: '10249', name: 'Xã Thư Phú' },
          { code: '10252', name: 'Xã Nguyễn Trãi' },
          { code: '10255', name: 'Xã Quất Động' },
          { code: '10258', name: 'Xã Chương Dương' },
          { code: '10261', name: 'Xã Tân Minh' },
          { code: '10264', name: 'Xã Lê Lợi' },
          { code: '10267', name: 'Xã Thắng Lợi' },
          { code: '10270', name: 'Xã Dũng Tiến' },
          { code: '10273', name: 'Xã Thống Nhất' },
          { code: '10276', name: 'Xã Nghiêm Xuyên' },
          { code: '10279', name: 'Xã Tô Hiệu' },
          { code: '10282', name: 'Xã Văn Tự' },
          { code: '10285', name: 'Xã Vạn Điểm' },
          { code: '10288', name: 'Xã Minh Cường' }
        ]
      },
      {
        code: '280',
        name: 'Huyện Phú Xuyên',
        wards: [
          { code: '10291', name: 'Thị trấn Phú Minh' },
          { code: '10294', name: 'Thị trấn Phú Xuyên' },
          { code: '10297', name: 'Xã Hồng Minh' },
          { code: '10300', name: 'Xã Phượng Dực' },
          { code: '10303', name: 'Xã Nam Tiến' },
          { code: '10309', name: 'Xã Tri Trung' },
          { code: '10312', name: 'Xã Đại Thắng' },
          { code: '10315', name: 'Xã Phú Túc' },
          { code: '10318', name: 'Xã Văn Hoàng' },
          { code: '10321', name: 'Xã Hồng Thái' },
          { code: '10324', name: 'Xã Hoàng Long' },
          { code: '10327', name: 'Xã Quang Trung' },
          { code: '10330', name: 'Xã Nam Phong' },
          { code: '10333', name: 'Xã Nam Triều' },
          { code: '10336', name: 'Xã Tân Dân' },
          { code: '10339', name: 'Xã Sơn Hà' },
          { code: '10342', name: 'Xã Chuyên Mỹ' },
          { code: '10345', name: 'Xã Khai Thái' },
          { code: '10348', name: 'Xã Phúc Tiến' },
          { code: '10351', name: 'Xã Vân Từ' },
          { code: '10354', name: 'Xã Tri Thủy' },
          { code: '10357', name: 'Xã Đại Xuyên' },
          { code: '10360', name: 'Xã Phú Yên' },
          { code: '10363', name: 'Xã Bạch Hạ' },
          { code: '10366', name: 'Xã Quang Lãng' },
          { code: '10369', name: 'Xã Châu Can' },
          { code: '10372', name: 'Xã Minh Tân' }
        ]
      },
      {
        code: '281',
        name: 'Huyện ứng Hòa',
        wards: [
          { code: '10375', name: 'Thị trấn Vân Đình' },
          { code: '10378', name: 'Xã Viên An' },
          { code: '10381', name: 'Xã Viên Nội' },
          { code: '10384', name: 'Xã Hoa Sơn' },
          { code: '10387', name: 'Xã Quảng Phú Cầu' },
          { code: '10390', name: 'Xã Trường Thịnh' },
          { code: '10393', name: 'Xã Cao Thành' },
          { code: '10396', name: 'Xã Liên Bạt' },
          { code: '10399', name: 'Xã Sơn Công' },
          { code: '10402', name: 'Xã Đồng Tiến' },
          { code: '10405', name: 'Xã Phương Tú' },
          { code: '10408', name: 'Xã Trung Tú' },
          { code: '10411', name: 'Xã Đồng Tân' },
          { code: '10414', name: 'Xã Tảo Dương Văn' },
          { code: '10417', name: 'Xã Vạn Thái' },
          { code: '10420', name: 'Xã Minh Đức' },
          { code: '10423', name: 'Xã Hòa Lâm' },
          { code: '10426', name: 'Xã Hòa Xá' },
          { code: '10429', name: 'Xã Trầm Lộng' },
          { code: '10432', name: 'Xã Kim Đường' },
          { code: '10435', name: 'Xã Hòa Nam' },
          { code: '10438', name: 'Xã Hòa Phú' },
          { code: '10441', name: 'Xã Đội Bình' },
          { code: '10444', name: 'Xã Đại Hùng' },
          { code: '10447', name: 'Xã Đông Lỗ' },
          { code: '10450', name: 'Xã Phù Lưu' },
          { code: '10453', name: 'Xã Đại Cường' },
          { code: '10456', name: 'Xã Lưu Hoàng' },
          { code: '10459', name: 'Xã Hồng Quang' }
        ]
      },
      {
        code: '282',
        name: 'Huyện Mỹ Đức',
        wards: [
          { code: '10462', name: 'Thị trấn Đại Nghĩa' },
          { code: '10465', name: 'Xã Đồng Tâm' },
          { code: '10468', name: 'Xã Thượng Lâm' },
          { code: '10471', name: 'Xã Tuy Lai' },
          { code: '10474', name: 'Xã Phúc Lâm' },
          { code: '10477', name: 'Xã Mỹ Thành' },
          { code: '10480', name: 'Xã Bột Xuyên' },
          { code: '10483', name: 'Xã An Mỹ' },
          { code: '10486', name: 'Xã Hồng Sơn' },
          { code: '10489', name: 'Xã Lê Thanh' },
          { code: '10492', name: 'Xã Xuy Xá' },
          { code: '10495', name: 'Xã Phùng Xá' },
          { code: '10498', name: 'Xã Phù Lưu Tế' },
          { code: '10501', name: 'Xã Đại Hưng' },
          { code: '10504', name: 'Xã Vạn Kim' },
          { code: '10507', name: 'Xã Đốc Tín' },
          { code: '10510', name: 'Xã Hương Sơn' },
          { code: '10513', name: 'Xã Hùng Tiến' },
          { code: '10516', name: 'Xã An Tiến' },
          { code: '10519', name: 'Xã Hợp Tiến' },
          { code: '10522', name: 'Xã Hợp Thanh' },
          { code: '10525', name: 'Xã An Phú' }
        ]
      }
    ]
  },
  {
    code: '79',
    name: 'Thành phố Hồ Chí Minh',
    districts: [
      {
        code: '760',
        name: 'Quận 1',
        wards: [
          { code: '26734', name: 'Phường Tân Định' },
          { code: '26737', name: 'Phường Đa Kao' },
          { code: '26740', name: 'Phường Bến Nghé' },
          { code: '26743', name: 'Phường Bến Thành' },
          { code: '26746', name: 'Phường Nguyễn Thái Bình' },
          { code: '26749', name: 'Phường Phạm Ngũ Lão' },
          { code: '26752', name: 'Phường Cầu Ông Lãnh' },
          { code: '26755', name: 'Phường Cô Giang' },
          { code: '26758', name: 'Phường Nguyễn Cư Trinh' },
          { code: '26761', name: 'Phường Cầu Kho' }
        ]
      },
      {
        code: '761',
        name: 'Quận 12',
        wards: [
          { code: '26764', name: 'Phường Thạnh Xuân' },
          { code: '26767', name: 'Phường Thạnh Lộc' },
          { code: '26770', name: 'Phường Hiệp Thành' },
          { code: '26773', name: 'Phường Thới An' },
          { code: '26776', name: 'Phường Tân Chánh Hiệp' },
          { code: '26779', name: 'Phường An Phú Đông' },
          { code: '26782', name: 'Phường Tân Thới Hiệp' },
          { code: '26785', name: 'Phường Trung Mỹ Tây' },
          { code: '26787', name: 'Phường Tân Hưng Thuận' },
          { code: '26788', name: 'Phường Đông Hưng Thuận' },
          { code: '26791', name: 'Phường Tân Thới Nhất' }
        ]
      },
      {
        code: '764', // Mã này đã bị đổi thành 761 ở trên, giữ 761 theo dữ liệu mới nhất
        name: 'Quận Gò Vấp', // Đổi tên cho đúng mã 764
        wards: [
          { code: '26887', name: 'Phường 15' },
          { code: '26890', name: 'Phường 13' },
          { code: '26893', name: 'Phường 17' },
          { code: '26894', name: 'Phường 6' },
          { code: '26896', name: 'Phường 16' },
          { code: '26899', name: 'Phường 12' },
          { code: '26902', name: 'Phường 14' },
          { code: '26905', name: 'Phường 10' },
          { code: '26908', name: 'Phường 05' },
          { code: '26911', name: 'Phường 07' },
          { code: '26914', name: 'Phường 04' },
          { code: '26917', name: 'Phường 01' },
          { code: '26920', name: 'Phường 9' },
          { code: '26923', name: 'Phường 8' },
          { code: '26926', name: 'Phường 11' },
          { code: '26929', name: 'Phường 03' }
        ]
      },
      {
        code: '765',
        name: 'Quận Bình Thạnh',
        wards: [
          { code: '26932', name: 'Phường 13' },
          { code: '26935', name: 'Phường 11' },
          { code: '26938', name: 'Phường 27' },
          { code: '26941', name: 'Phường 26' },
          { code: '26944', name: 'Phường 12' },
          { code: '26947', name: 'Phường 25' },
          { code: '26950', name: 'Phường 05' },
          { code: '26953', name: 'Phường 07' },
          { code: '26956', name: 'Phường 24' },
          { code: '26959', name: 'Phường 06' },
          { code: '26962', name: 'Phường 14' },
          { code: '26965', name: 'Phường 15' },
          { code: '26968', name: 'Phường 02' },
          { code: '26971', name: 'Phường 01' },
          { code: '26974', name: 'Phường 03' },
          { code: '26977', name: 'Phường 17' },
          { code: '26980', name: 'Phường 21' },
          { code: '26983', name: 'Phường 22' },
          { code: '26986', name: 'Phường 19' },
          { code: '26989', name: 'Phường 28' }
        ]
      },
      {
        code: '766',
        name: 'Quận Tân Bình',
        wards: [
          { code: '26992', name: 'Phường 02' },
          { code: '26995', name: 'Phường 04' },
          { code: '26998', name: 'Phường 12' },
          { code: '27001', name: 'Phường 13' },
          { code: '27004', name: 'Phường 01' },
          { code: '27007', name: 'Phường 03' },
          { code: '27010', name: 'Phường 11' },
          { code: '27013', name: 'Phường 07' },
          { code: '27016', name: 'Phường 05' },
          { code: '27019', name: 'Phường 10' },
          { code: '27022', name: 'Phường 06' },
          { code: '27025', name: 'Phường 08' },
          { code: '27028', name: 'Phường 09' },
          { code: '27031', name: 'Phường 14' },
          { code: '27034', name: 'Phường 15' }
        ]
      },
      {
        code: '767',
        name: 'Quận Tân Phú',
        wards: [
          { code: '27037', name: 'Phường Tân Sơn Nhì' },
          { code: '27040', name: 'Phường Tây Thạnh' },
          { code: '27043', name: 'Phường Sơn Kỳ' },
          { code: '27046', name: 'Phường Tân Quý' },
          { code: '27049', name: 'Phường Tân Thành' },
          { code: '27052', name: 'Phường Phú Thọ Hòa' },
          { code: '27055', name: 'Phường Phú Thạnh' },
          { code: '27058', name: 'Phường Phú Trung' },
          { code: '27061', name: 'Phường Hòa Thạnh' },
          { code: '27064', name: 'Phường Hiệp Tân' },
          { code: '27067', name: 'Phường Tân Thới Hòa' }
        ]
      },
      {
        code: '768',
        name: 'Quận Phú Nhuận',
        wards: [
          { code: '27070', name: 'Phường 04' },
          { code: '27073', name: 'Phường 05' },
          { code: '27076', name: 'Phường 09' },
          { code: '27079', name: 'Phường 07' },
          { code: '27082', name: 'Phường 03' },
          { code: '27085', name: 'Phường 01' },
          { code: '27088', name: 'Phường 02' },
          { code: '27091', name: 'Phường 08' },
          { code: '27094', name: 'Phường 15' },
          { code: '27097', name: 'Phường 10' },
          { code: '27100', name: 'Phường 11' },
          { code: '27103', name: 'Phường 17' },
          { code: '27106', name: 'Phường 13' } // Sửa từ 14 thành 13
        ]
      },
      {
        code: '769',
        name: 'Thành phố Thủ Đức', // Thay Quận 2, 9, Thủ Đức cũ
        wards: [
          { code: '26794', name: 'Phường Linh Xuân' },
          { code: '26797', name: 'Phường Bình Chiểu' },
          { code: '26800', name: 'Phường Linh Trung' },
          { code: '26803', name: 'Phường Tam Bình' },
          { code: '26806', name: 'Phường Tam Phú' },
          { code: '26809', name: 'Phường Hiệp Bình Chánh' },
          { code: '26812', name: 'Phường Hiệp Bình Phước' },
          { code: '26815', name: 'Phường Trường Thọ' },
          { code: '26818', name: 'Phường Linh Chiểu' },
          { code: '26821', name: 'Phường Linh Tây' },
          { code: '26824', name: 'Phường Linh Đông' },
          { code: '26827', name: 'Phường Bình Thọ' },
          { code: '27109', name: 'Phường An Phú' },
          { code: '27112', name: 'Phường Thảo Điền' },
          { code: '27115', name: 'Phường An Khánh' },
          { code: '27118', name: 'Phường Bình An' },
          { code: '27121', name: 'Phường Bình Khánh' },
          { code: '27124', name: 'Phường An Lợi Đông' },
          { code: '27127', name: 'Phường Thủ Thiêm' },
          { code: '27130', name: 'Phường Long Bình' },
          { code: '27133', name: 'Phường Long Thạnh Mỹ' },
          { code: '27136', name: 'Phường Tân Phú' },
          { code: '27139', name: 'Phường Hiệp Phú' },
          { code: '27142', name: 'Phường Tăng Nhơn Phú A' },
          { code: '27145', name: 'Phường Tăng Nhơn Phú B' },
          { code: '27148', name: 'Phường Phước Long B' },
          { code: '27151', name: 'Phường Phước Long A' },
          { code: '27154', name: 'Phường Trường Thạnh' },
          { code: '27157', name: 'Phường Long Phước' },
          { code: '27160', name: 'Phường Long Trường' },
          { code: '27163', name: 'Phường Phước Bình' },
          { code: '27166', name: 'Phường Phú Hữu' }
        ]
      },
      {
        code: '770',
        name: 'Quận 3',
        wards: [
          { code: '27169', name: 'Phường 14' },
          { code: '27172', name: 'Phường 12' },
          { code: '27175', name: 'Phường 11' },
          { code: '27178', name: 'Phường 13' },
          { code: '27181', name: 'Phường Võ Thị Sáu' }, // Gộp P6,7,8
          { code: '27184', name: 'Phường 09' },
          { code: '27187', name: 'Phường 10' },
          { code: '27190', name: 'Phường 04' },
          { code: '27193', name: 'Phường 05' },
          { code: '27196', name: 'Phường 03' },
          { code: '27199', name: 'Phường 02' },
          { code: '27202', name: 'Phường 01' }
        ]
      },
      {
        code: '771',
        name: 'Quận 10',
        wards: [
          { code: '27205', name: 'Phường 15' },
          { code: '27208', name: 'Phường 13' },
          { code: '27211', name: 'Phường 14' },
          { code: '27214', name: 'Phường 12' },
          { code: '27217', name: 'Phường 11' },
          { code: '27220', name: 'Phường 10' },
          { code: '27223', name: 'Phường 09' },
          { code: '27226', name: 'Phường 01' },
          { code: '27229', name: 'Phường 08' },
          { code: '27232', name: 'Phường 02' },
          { code: '27235', name: 'Phường 04' },
          { code: '27238', name: 'Phường 07' },
          { code: '27241', name: 'Phường 05' },
          { code: '27244', name: 'Phường 06' }
        ]
      },
      {
        code: '772',
        name: 'Quận 11',
        wards: [
          { code: '27247', name: 'Phường 15' },
          { code: '27250', name: 'Phường 05' },
          { code: '27253', name: 'Phường 14' },
          { code: '27256', name: 'Phường 11' },
          { code: '27259', name: 'Phường 03' },
          { code: '27262', name: 'Phường 10' },
          { code: '27265', name: 'Phường 13' },
          { code: '27268', name: 'Phường 08' },
          { code: '27271', name: 'Phường 09' },
          { code: '27274', name: 'Phường 12' },
          { code: '27277', name: 'Phường 07' },
          { code: '27280', name: 'Phường 06' },
          { code: '27283', name: 'Phường 04' },
          { code: '27286', name: 'Phường 01' },
          { code: '27289', name: 'Phường 02' },
          { code: '27292', name: 'Phường 16' }
        ]
      },
      {
        code: '773',
        name: 'Quận 4',
        wards: [
          { code: '27295', name: 'Phường 13' }, // Gộp 12, 13
          { code: '27298', name: 'Phường 09' },
          { code: '27301', name: 'Phường 06' },
          { code: '27304', name: 'Phường 08' },
          { code: '27307', name: 'Phường 10' },
          { code: '27310', name: 'Phường 18' }, // Gộp 18
          { code: '27313', name: 'Phường 14' },
          { code: '27316', name: 'Phường 04' },
          { code: '27319', name: 'Phường 03' }, // Gộp 2, 3
          { code: '27322', name: 'Phường 16' }, // Gộp 15, 16
          { code: '27325', name: 'Phường 01' },
          { code: '27328', name: 'Phường 05' }
        ]
      },
      {
        code: '774',
        name: 'Quận 5',
        wards: [
          { code: '27331', name: 'Phường 04' },
          { code: '27334', name: 'Phường 09' },
          { code: '27337', name: 'Phường 03' },
          { code: '27340', name: 'Phường 12' },
          { code: '27343', name: 'Phường 02' },
          { code: '27346', name: 'Phường 08' },
          { code: '27352', name: 'Phường 07' },
          { code: '27355', name: 'Phường 01' },
          { code: '27358', name: 'Phường 11' },
          { code: '27361', name: 'Phường 14' },
          { code: '27364', name: 'Phường 05' },
          { code: '27367', name: 'Phường 06' },
          { code: '27370', name: 'Phường 10' },
          { code: '27373', name: 'Phường 13' }
        ]
      },
      {
        code: '775',
        name: 'Quận 6',
        wards: [
          { code: '27376', name: 'Phường 14' },
          { code: '27379', name: 'Phường 13' },
          { code: '27382', name: 'Phường 09' },
          { code: '27385', name: 'Phường 06' },
          { code: '27388', name: 'Phường 12' },
          { code: '27391', name: 'Phường 05' },
          { code: '27394', name: 'Phường 11' },
          { code: '27397', name: 'Phường 02' },
          { code: '27400', name: 'Phường 01' },
          { code: '27403', name: 'Phường 04' },
          { code: '27406', name: 'Phường 08' },
          { code: '27409', name: 'Phường 03' },
          { code: '27412', name: 'Phường 07' },
          { code: '27415', name: 'Phường 10' }
        ]
      },
      {
        code: '776',
        name: 'Quận 8',
        wards: [
          { code: '27418', name: 'Phường 08' },
          { code: '27421', name: 'Phường 02' },
          { code: '27424', name: 'Phường 01' },
          { code: '27427', name: 'Phường 03' },
          { code: '27430', name: 'Phường 11' },
          { code: '27433', name: 'Phường 09' },
          { code: '27436', name: 'Phường 10' },
          { code: '27439', name: 'Phường 04' },
          { code: '27442', name: 'Phường 13' },
          { code: '27445', name: 'Phường 12' },
          { code: '27448', name: 'Phường 05' },
          { code: '27451', name: 'Phường 14' },
          { code: '27454', name: 'Phường 06' },
          { code: '27457', name: 'Phường 15' },
          { code: '27460', name: 'Phường 16' },
          { code: '27463', name: 'Phường 07' }
        ]
      },
      {
        code: '777',
        name: 'Quận Bình Tân',
        wards: [
          { code: '27466', name: 'Phường Bình Hưng Hòa' },
          { code: '27469', name: 'Phường Bình Hưng Hoà A' },
          { code: '27472', name: 'Phường Bình Hưng Hoà B' },
          { code: '27475', name: 'Phường Bình Trị Đông' },
          { code: '27478', name: 'Phường Bình Trị Đông A' },
          { code: '27481', name: 'Phường Bình Trị Đông B' },
          { code: '27484', name: 'Phường Tân Tạo' },
          { code: '27487', name: 'Phường Tân Tạo A' },
          { code: '27490', name: 'Phường An Lạc' },
          { code: '27493', name: 'Phường An Lạc A' }
        ]
      },
      {
        code: '778',
        name: 'Quận 7',
        wards: [
          { code: '27496', name: 'Phường Tân Thuận Đông' },
          { code: '27499', name: 'Phường Tân Thuận Tây' },
          { code: '27502', name: 'Phường Tân Kiểng' },
          { code: '27505', name: 'Phường Tân Hưng' },
          { code: '27508', name: 'Phường Bình Thuận' },
          { code: '27511', name: 'Phường Tân Quy' },
          { code: '27514', name: 'Phường Phú Thuận' },
          { code: '27517', name: 'Phường Tân Phú' },
          { code: '27520', name: 'Phường Tân Phong' },
          { code: '27523', name: 'Phường Phú Mỹ' }
        ]
      },
      {
        code: '783',
        name: 'Huyện Củ Chi',
        wards: [
          { code: '27526', name: 'Thị trấn Củ Chi' },
          { code: '27529', name: 'Xã Phú Mỹ Hưng' },
          { code: '27532', name: 'Xã An Phú' },
          { code: '27535', name: 'Xã Trung Lập Thượng' },
          { code: '27538', name: 'Xã An Nhơn Tây' },
          { code: '27541', name: 'Xã Nhuận Đức' },
          { code: '27544', name: 'Xã Phạm Văn Cội' },
          { code: '27547', name: 'Xã Phú Hòa Đông' },
          { code: '27550', name: 'Xã Trung Lập Hạ' },
          { code: '27553', name: 'Xã Trung An' },
          { code: '27556', name: 'Xã Phước Thạnh' },
          { code: '27559', name: 'Xã Phước Hiệp' },
          { code: '27562', name: 'Xã Tân An Hội' },
          { code: '27565', name: 'Xã Phước Vĩnh An' },
          { code: '27568', name: 'Xã Thái Mỹ' },
          { code: '27571', name: 'Xã Tân Thạnh Tây' },
          { code: '27574', name: 'Xã Hòa Phú' },
          { code: '27577', name: 'Xã Tân Thạnh Đông' },
          { code: '27580', name: 'Xã Bình Mỹ' },
          { code: '27583', name: 'Xã Tân Phú Trung' },
          { code: '27586', name: 'Xã Tân Thông Hội' }
        ]
      },
      {
        code: '784',
        name: 'Huyện Hóc Môn',
        wards: [
          { code: '27589', name: 'Thị trấn Hóc Môn' },
          { code: '27592', name: 'Xã Tân Hiệp' },
          { code: '27595', name: 'Xã Nhị Bình' },
          { code: '27598', name: 'Xã Đông Thạnh' },
          { code: '27601', name: 'Xã Tân Thới Nhì' },
          { code: '27604', name: 'Xã Thới Tam Thôn' },
          { code: '27607', name: 'Xã Xuân Thới Sơn' },
          { code: '27610', name: 'Xã Tân Xuân' },
          { code: '27613', name: 'Xã Xuân Thới Đông' },
          { code: '27616', name: 'Xã Trung Chánh' },
          { code: '27619', name: 'Xã Xuân Thới Thượng' },
          { code: '27622', name: 'Xã Bà Điểm' }
        ]
      },
      {
        code: '785',
        name: 'Huyện Bình Chánh',
        wards: [
          { code: '27625', name: 'Thị trấn Tân Túc' },
          { code: '27628', name: 'Xã Phạm Văn Hai' },
          { code: '27631', name: 'Xã Vĩnh Lộc A' },
          { code: '27634', name: 'Xã Vĩnh Lộc B' },
          { code: '27637', name: 'Xã Bình Lợi' },
          { code: '27640', name: 'Xã Lê Minh Xuân' },
          { code: '27643', name: 'Xã Tân Nhựt' },
          { code: '27646', name: 'Xã Tân Kiên' },
          { code: '27649', name: 'Xã Bình Hưng' },
          { code: '27652', name: 'Xã Phong Phú' },
          { code: '27655', name: 'Xã An Phú Tây' },
          { code: '27658', name: 'Xã Hưng Long' },
          { code: '27661', name: 'Xã Đa Phước' },
          { code: '27664', name: 'Xã Tân Quý Tây' },
          { code: '27667', name: 'Xã Bình Chánh' },
          { code: '27670', name: 'Xã Quy Đức' }
        ]
      },
      {
        code: '786',
        name: 'Huyện Nhà Bè',
        wards: [
          { code: '27673', name: 'Thị trấn Nhà Bè' },
          { code: '27676', name: 'Xã Phước Kiển' },
          { code: '27679', name: 'Xã Phước Lộc' },
          { code: '27682', name: 'Xã Nhơn Đức' },
          { code: '27685', name: 'Xã Phú Xuân' },
          { code: '27688', name: 'Xã Long Thới' },
          { code: '27691', name: 'Xã Hiệp Phước' }
        ]
      },
      {
        code: '787',
        name: 'Huyện Cần Giờ',
        wards: [
          { code: '27694', name: 'Thị trấn Cần Thạnh' },
          { code: '27697', name: 'Xã Bình Khánh' },
          { code: '27700', name: 'Xã Tam Thôn Hiệp' },
          { code: '27703', name: 'Xã An Thới Đông' },
          { code: '27706', name: 'Xã Thạnh An' },
          { code: '27709', name: 'Xã Long Hòa' },
          { code: '27712', name: 'Xã Lý Nhơn' }
        ]
      }
    ]
  },
  {
    code: '31',
    name: 'Thành phố Hải Phòng',
    districts: [
      {
        code: '303',
        name: 'Quận Hồng Bàng',
        wards: [
          { code: '11737', name: 'Phường Quán Toan' },
          { code: '11740', name: 'Phường Hùng Vương' },
          { code: '11743', name: 'Phường Sở Dầu' },
          { code: '11746', name: 'Phường Thượng Lý' },
          { code: '11749', name: 'Phường Hạ Lý' },
          { code: '11752', name: 'Phường Minh Khai' },
          { code: '11755', name: 'Phường Trại Chuối' },
          { code: '11758', name: 'Phường Hoàng Văn Thụ' },
          { code: '11761', name: 'Phường Phan Bội Châu' }
        ]
      },
      {
        code: '304',
        name: 'Quận Ngô Quyền',
        wards: [
          { code: '11770', name: 'Phường Máy Chai' },
          { code: '11773', name: 'Phường Máy Tơ' },
          { code: '11776', name: 'Phường Vạn Mỹ' },
          { code: '11779', name: 'Phường Cầu Tre' },
          { code: '11782', name: 'Phường Lạc Viên' },
          { code: '11788', name: 'Phường Gia Viên' },
          { code: '11791', name: 'Phường Đông Khê' },
          { code: '11794', name: 'Phường Cầu Đất' },
          { code: '11797', name: 'Phường Lê Lợi' },
          { code: '11800', name: 'Phường Đằng Giang' },
          { code: '11803', name: 'Phường Lạch Tray' },
          { code: '11806', name: 'Phường Đổng Quốc Bình' }
        ]
      },
      {
        code: '305',
        name: 'Quận Lê Chân',
        wards: [
          { code: '11809', name: 'Phường Cát Dài' },
          { code: '11812', name: 'Phường An Biên' },
          { code: '11815', name: 'Phường Lam Sơn' },
          { code: '11818', name: 'Phường An Dương' },
          { code: '11821', name: 'Phường Trần Nguyên Hãn' },
          { code: '11824', name: 'Phường Hồ Nam' },
          { code: '11827', name: 'Phường Trại Cau' },
          { code: '11830', name: 'Phường Dư Hàng' },
          { code: '11833', name: 'Phường Hàng Kênh' },
          { code: '11836', name: 'Phường Đông Hải' },
          { code: '11839', name: 'Phường Niệm Nghĩa' },
          { code: '11842', name: 'Phường Nghĩa Xá' },
          { code: '11845', name: 'Phường Dư Hàng Kênh' },
          { code: '11846', name: 'Phường Kênh Dương' },
          { code: '11848', name: 'Phường Vĩnh Niệm' }
        ]
      },
      {
        code: '306',
        name: 'Quận Hải An',
        wards: [
          { code: '11851', name: 'Phường Đông Hải 1' },
          { code: '11852', name: 'Phường Đông Hải 2' },
          { code: '11854', name: 'Phường Đằng Lâm' },
          { code: '11855', name: 'Phường Thành Tô' },
          { code: '11857', name: 'Phường Đằng Hải' },
          { code: '11860', name: 'Phường Nam Hải' },
          { code: '11863', name: 'Phường Cát Bi' },
          { code: '11866', name: 'Phường Tràng Cát' }
        ]
      },
      {
        code: '307',
        name: 'Quận Kiến An',
        wards: [
          { code: '11869', name: 'Phường Quán Trữ' },
          { code: '11870', name: 'Phường Lãm Hà' },
          { code: '11872', name: 'Phường Đồng Hoà' },
          { code: '11875', name: 'Phường Bắc Sơn' },
          { code: '11878', name: 'Phường Nam Sơn' },
          { code: '11881', name: 'Phường Ngọc Sơn' },
          { code: '11884', name: 'Phường Trần Thành Ngọ' },
          { code: '11887', name: 'Phường Văn Đẩu' },
          { code: '11890', name: 'Phường Phù Liễn' },
          { code: '11893', name: 'Phường Tràng Minh' }
        ]
      },
      {
        code: '308',
        name: 'Quận Đồ Sơn',
        wards: [
          { code: '11896', name: 'Phường Ngọc Xuyên' },
          { code: '11902', name: 'Phường Hải Sơn' },
          { code: '11905', name: 'Phường Vạn Hương' },
          { code: '11908', name: 'Phường Minh Đức' },
          { code: '11911', name: 'Phường Bàng La' },
          { code: '11914', name: 'Phường Hợp Đức' }
        ]
      },
      {
        code: '309',
        name: 'Quận Dương Kinh',
        wards: [
          { code: '11856', name: 'Phường Đa Phúc' },
          { code: '11858', name: 'Phường Hưng Đạo' },
          { code: '11861', name: 'Phường Anh Dũng' },
          { code: '11864', name: 'Phường Hải Thành' },
          { code: '11917', name: 'Phường Hoà Nghĩa' },
          { code: '11920', name: 'Phường Tân Thành' }
        ]
      },
      {
        code: '311',
        name: 'Huyện Thuỷ Nguyên',
        wards: [
          { code: '11923', name: 'Thị trấn Núi Đèo' },
          { code: '11926', name: 'Thị trấn Minh Đức' },
          { code: '11929', name: 'Xã Lại Xuân' },
          { code: '11932', name: 'Xã An Sơn' },
          { code: '11935', name: 'Xã Kỳ Sơn' },
          { code: '11938', name: 'Xã Liên Khê' },
          { code: '11941', name: 'Xã Lưu Kiếm' },
          { code: '11944', name: 'Xã Lưu Kỳ' },
          { code: '11947', name: 'Xã Gia Minh' },
          { code: '11950', name: 'Xã Gia Đức' },
          { code: '11953', name: 'Xã Minh Tân' },
          { code: '11956', name: 'Xã Phù Ninh' },
          { code: '11959', name: 'Xã Quảng Thanh' },
          { code: '11962', name: 'Xã Chính Mỹ' },
          { code: '11965', name: 'Xã Kênh Giang' },
          { code: '11968', name: 'Xã Hợp Thành' },
          { code: '11971', name: 'Xã Cao Nhân' },
          { code: '11974', name: 'Xã Mỹ Đồng' },
          { code: '11977', name: 'Xã Đông Sơn' },
          { code: '11980', name: 'Xã Hoà Bình' },
          { code: '11983', name: 'Xã Trung Hà' },
          { code: '11986', name: 'Xã An Lư' },
          { code: '11989', name: 'Xã Thuỷ Triều' },
          { code: '11992', name: 'Xã Ngũ Lão' },
          { code: '11995', name: 'Xã Phục Lễ' },
          { code: '11998', name: 'Xã Tam Hưng' },
          { code: '12001', name: 'Xã Phả Lễ' },
          { code: '12004', name: 'Xã Lập Lễ' },
          { code: '12007', name: 'Xã Kiền Bái' },
          { code: '12010', name: 'Xã Thiên Hương' },
          { code: '12013', name: 'Xã Thuỷ Sơn' },
          { code: '12016', name: 'Xã Thuỷ Đường' },
          { code: '12019', name: 'Xã Hoàng Động' },
          { code: '12022', name: 'Xã Lâm Động' },
          { code: '12025', name: 'Xã Hoa Động' },
          { code: '12028', name: 'Xã Tân Dương' },
          { code: '12031', name: 'Xã Dương Quan' }
        ]
      },
      {
        code: '312',
        name: 'Huyện An Dương',
        wards: [
          { code: '12034', name: 'Thị trấn An Dương' },
          { code: '12037', name: 'Xã Lê Thiện' },
          { code: '12040', name: 'Xã Đại Bản' },
          { code: '12043', name: 'Xã An Hoà' },
          { code: '12046', name: 'Xã Hồng Phong' },
          { code: '12049', name: 'Xã Tân Tiến' },
          { code: '12052', name: 'Xã An Hưng' },
          { code: '12055', name: 'Xã An Hồng' },
          { code: '12058', name: 'Xã Bắc Sơn' },
          { code: '12061', name: 'Xã Nam Sơn' },
          { code: '12064', name: 'Xã Lê Lợi' },
          { code: '12067', name: 'Xã Đặng Cương' },
          { code: '12070', name: 'Xã Đồng Thái' },
          { code: '12073', name: 'Xã Quốc Tuấn' },
          { code: '12076', name: 'Xã An Đồng' },
          { code: '12079', name: 'Xã Hồng Thái' }
        ]
      },
      {
        code: '313',
        name: 'Huyện An Lão',
        wards: [
          { code: '12082', name: 'Thị trấn An Lão' },
          { code: '12085', name: 'Xã Bát Trang' },
          { code: '12088', name: 'Xã Trường Thọ' },
          { code: '12091', name: 'Xã Trường Thành' },
          { code: '12094', name: 'Xã An Tiến' },
          { code: '12097', name: 'Xã Quang Hưng' },
          { code: '12100', name: 'Xã Quang Trung' },
          { code: '12103', name: 'Xã Quốc Tuấn' },
          { code: '12106', name: 'Xã An Thắng' },
          { code: '12109', name: 'Thị trấn Trường Sơn' },
          { code: '12112', name: 'Xã Tân Dân' },
          { code: '12115', name: 'Xã Thái Sơn' },
          { code: '12118', name: 'Xã Tân Viên' },
          { code: '12121', name: 'Xã Mỹ Đức' },
          { code: '12124', name: 'Xã Chiến Thắng' },
          { code: '12127', name: 'Xã An Thọ' },
          { code: '12130', name: 'Xã An Thái' }
        ]
      },
      {
        code: '314',
        name: 'Huyện Kiến Thuỵ',
        wards: [
          { code: '12133', name: 'Thị trấn Núi Đối' },
          { code: '12136', name: 'Xã Đông Phương' },
          { code: '12139', name: 'Xã Thuận Thiên' },
          { code: '12142', name: 'Xã Hữu Bằng' },
          { code: '12145', name: 'Xã Đại Đồng' },
          { code: '12148', name: 'Xã Ngũ Đoan' },
          { code: '12151', name: 'Xã Đại Hà' },
          { code: '12154', name: 'Xã Tân Phong' },
          { code: '12157', name: 'Xã Tân Trào' },
          { code: '12160', name: 'Xã Đoàn Xá' },
          { code: '12163', name: 'Xã Tú Sơn' },
          { code: '12166', name: 'Xã Đại Hợp' },
          { code: '12169', name: 'Xã Thuỵ Hương' },
          { code: '12172', name: 'Xã Thanh Sơn' },
          { code: '12175', name: 'Xã Minh Tân' },
          { code: '12178', name: 'Xã Du Lễ' },
          { code: '12181', name: 'Xã Ngũ Phúc' }
        ]
      },
      {
        code: '315',
        name: 'Huyện Tiên Lãng',
        wards: [
          { code: '12184', name: 'Thị trấn Tiên Lãng' },
          { code: '12187', name: 'Xã Đại Thắng' },
          { code: '12190', name: 'Xã Tiên Cường' },
          { code: '12193', name: 'Xã Tự Cường' },
          { code: '12196', name: 'Xã Quyết Tiến' },
          { code: '12199', name: 'Xã Khởi Nghĩa' },
          { code: '12202', name: 'Xã Tiên Thanh' },
          { code: '12205', name: 'Xã Cấp Tiến' },
          { code: '12208', name: 'Xã Kiến Thiết' },
          { code: '12211', name: 'Xã Đoàn Lập' },
          { code: '12214', name: 'Xã Bạch Đằng' },
          { code: '12217', name: 'Xã Quang Phục' },
          { code: '12220', name: 'Xã Toàn Thắng' },
          { code: '12223', name: 'Xã Tiên Thắng' },
          { code: '12226', name: 'Xã Tiên Minh' },
          { code: '12229', name: 'Xã Bắc Hưng' },
          { code: '12232', name: 'Xã Nam Hưng' },
          { code: '12235', name: 'Xã Hùng Thắng' },
          { code: '12238', name: 'Xã Tây Hưng' },
          { code: '12241', name: 'Xã Đông Hưng' },
          { code: '12244', name: 'Xã Vinh Quang' }
        ]
      },
      {
        code: '316',
        name: 'Huyện Vĩnh Bảo',
        wards: [
          { code: '12247', name: 'Thị trấn Vĩnh Bảo' },
          { code: '12250', name: 'Xã Dũng Tiến' },
          { code: '12253', name: 'Xã Giang Biên' },
          { code: '12256', name: 'Xã Thắng Thuỷ' },
          { code: '12259', name: 'Xã Trung Lập' },
          { code: '12262', name: 'Xã Việt Tiến' },
          { code: '12265', name: 'Xã Vĩnh An' },
          { code: '12268', name: 'Xã Vĩnh Long' },
          { code: '12271', name: 'Xã Hiệp Hoà' },
          { code: '12274', name: 'Xã Hùng Tiến' },
          { code: '12277', name: 'Xã An Hoà' },
          { code: '12280', name: 'Xã Tân Hưng' },
          { code: '12283', name: 'Xã Tân Liên' },
          { code: '12286', name: 'Xã Nhân Hoà' },
          { code: '12289', name: 'Xã Tam Đa' },
          { code: '12292', name: 'Xã Hưng Nhân' },
          { code: '12295', name: 'Xã Vinh Quang' },
          { code: '12298', name: 'Xã Đồng Minh' },
          { code: '12301', name: 'Xã Thanh Lương' },
          { code: '12304', name: 'Xã Liên Am' },
          { code: '12307', name: 'Xã Lý Học' },
          { code: '12310', name: 'Xã Tam Cường' },
          { code: '12313', name: 'Xã Hoà Bình' },
          { code: '12316', name: 'Xã Tiền Phong' },
          { code: '12319', name: 'Xã Vĩnh Phong' },
          { code: '12322', name: 'Xã Cộng Hiền' },
          { code: '12325', name: 'Xã Cao Minh' },
          { code: '12328', name: 'Xã Cổ Am' },
          { code: '12331', name: 'Xã Vĩnh Tiến' },
          { code: '12334', name: 'Xã Trấn Dương' }
        ]
      },
      {
        code: '317',
        name: 'Huyện Cát Hải',
        wards: [
          { code: '12337', name: 'Thị trấn Cát Bà' },
          { code: '12340', name: 'Thị trấn Cát Hải' },
          { code: '12343', name: 'Xã Nghĩa Lộ' },
          { code: '12346', name: 'Xã Đồng Bài' },
          { code: '12349', name: 'Xã Hoàng Châu' },
          { code: '12352', name: 'Xã Văn Phong' },
          { code: '12355', name: 'Xã Phù Long' },
          { code: '12358', name: 'Xã Gia Luận' },
          { code: '12361', name: 'Xã Hiền Hào' },
          { code: '12364', name: 'Xã Trân Châu' },
          { code: '12367', name: 'Xã Việt Hải' },
          { code: '12370', name: 'Xã Xuân Đám' }
        ]
      },
      {
        code: '318',
        name: 'Huyện Bạch Long Vĩ', // Lưu ý: Đây là huyện đảo, chỉ có 1 đơn vị hành chính cấp xã
        wards: [{ code: '12373', name: 'Xã Bạch Long Vĩ' }]
      }
    ]
  },
  {
    code: '92',
    name: 'Thành phố Cần Thơ',
    districts: [
      {
        code: '916',
        name: 'Quận Ninh Kiều',
        wards: [
          { code: '31174', name: 'Phường Cái Khế' },
          { code: '31177', name: 'Phường An Hòa' },
          { code: '31180', name: 'Phường Thới Bình' },
          { code: '31183', name: 'Phường An Nghiệp' },
          { code: '31186', name: 'Phường An Cư' },
          { code: '31189', name: 'Phường An Hội' }, // Sáp nhập Tân An và An Hội
          { code: '31192', name: 'Phường Tân Lộc' }, // Sáp nhập An Lạc và Tân An (một phần)
          { code: '31195', name: 'Phường An Phú' },
          { code: '31198', name: 'Phường Xuân Khánh' },
          { code: '31201', name: 'Phường Hưng Lợi' },
          { code: '31204', name: 'Phường An Bình' } // Sáp nhập An Bình và An Khánh (một phần)
        ]
      },
      {
        code: '917',
        name: 'Quận Ô Môn',
        wards: [
          { code: '31207', name: 'Phường Châu Văn Liêm' },
          { code: '31210', name: 'Phường Thới Hòa' },
          { code: '31213', name: 'Phường Thới Long' },
          { code: '31216', name: 'Phường Long Hưng' },
          { code: '31219', name: 'Phường Thới An' },
          { code: '31222', name: 'Phường Phước Thới' },
          { code: '31225', name: 'Phường Trường Lạc' }
        ]
      },
      {
        code: '918',
        name: 'Quận Bình Thuỷ',
        wards: [
          { code: '31228', name: 'Phường Bình Thủy' },
          { code: '31231', name: 'Phường Trà An' },
          { code: '31234', name: 'Phường Trà Nóc' },
          { code: '31237', name: 'Phường Thới An Đông' },
          { code: '31240', name: 'Phường An Thới' },
          { code: '31243', name: 'Phường Bùi Hữu Nghĩa' },
          { code: '31246', name: 'Phường Long Hòa' },
          { code: '31249', name: 'Phường Long Tuyền' }
        ]
      },
      {
        code: '919',
        name: 'Quận Cái Răng',
        wards: [
          { code: '31252', name: 'Phường Lê Bình' },
          { code: '31255', name: 'Phường Hưng Phú' },
          { code: '31258', name: 'Phường Hưng Thạnh' },
          { code: '31261', name: 'Phường Ba Láng' },
          { code: '31264', name: 'Phường Thường Thạnh' },
          { code: '31267', name: 'Phường Phú Thứ' },
          { code: '31270', name: 'Phường Tân Phú' }
        ]
      },
      {
        code: '923',
        name: 'Quận Thốt Nốt',
        wards: [
          { code: '31273', name: 'Phường Thốt Nốt' },
          { code: '31276', name: 'Phường Thới Thuận' },
          { code: '31278', name: 'Phường Thuận An' },
          { code: '31282', name: 'Phường Tân Lộc' },
          { code: '31285', name: 'Phường Trung Nhứt' },
          { code: '31288', name: 'Phường Thạnh Hoà' },
          { code: '31291', name: 'Phường Trung Kiên' },
          { code: '31297', name: 'Phường Tân Hưng' },
          { code: '31300', name: 'Phường Thuận Hưng' }
        ]
      },
      {
        code: '924',
        name: 'Huyện Vĩnh Thạnh',
        wards: [
          { code: '31303', name: 'Thị trấn Vĩnh Thạnh' },
          { code: '31304', name: 'Xã Thạnh Mỹ' },
          { code: '31306', name: 'Xã Vĩnh Trinh' },
          { code: '31309', name: 'Xã Thạnh An' },
          { code: '31310', name: 'Xã Thạnh Tiến' },
          { code: '31312', name: 'Xã Thạnh Thắng' },
          { code: '31315', name: 'Xã Thạnh Lợi' },
          { code: '31318', name: 'Xã Thạnh Quới' },
          { code: '31321', name: 'Xã Thạnh Phú' },
          { code: '31324', name: 'Xã Trung Hưng' },
          { code: '31327', name: 'Thị trấn Thạnh An' } // TT Thạnh An mới
        ]
      },
      {
        code: '925',
        name: 'Huyện Cờ Đỏ',
        wards: [
          { code: '31330', name: 'Xã Trung An' }, // TT Cờ Đỏ cũ và xã Trung An
          { code: '31333', name: 'Xã Trung Thạnh' },
          { code: '31336', name: 'Xã Thạnh Phú' },
          { code: '31339', name: 'Xã Trung Hưng' },
          { code: '31342', name: 'Thị trấn Cờ Đỏ' }, // Xã Thới Hưng
          { code: '31345', name: 'Xã Thới Đông' },
          { code: '31348', name: 'Xã Đông Hiệp' },
          { code: '31351', name: 'Xã Đông Thắng' },
          { code: '31354', name: 'Xã Thới Xuân' }
        ]
      },
      {
        code: '926',
        name: 'Huyện Phong Điền',
        wards: [
          { code: '31360', name: 'Thị trấn Phong Điền' },
          { code: '31363', name: 'Xã Nhơn Ái' },
          { code: '31366', name: 'Xã Giai Xuân' },
          { code: '31369', name: 'Xã Tân Thới' },
          { code: '31372', name: 'Xã Trường Long' },
          { code: '31375', name: 'Xã Mỹ Khánh' },
          { code: '31378', name: 'Xã Nhơn Nghĩa' }
        ]
      },
      {
        code: '927',
        name: 'Huyện Thới Lai',
        wards: [
          { code: '31381', name: 'Thị trấn Thới Lai' },
          { code: '31384', name: 'Xã Thới Thạnh' },
          { code: '31385', name: 'Xã Tân Thạnh' },
          { code: '31387', name: 'Xã Xuân Thắng' },
          { code: '31390', name: 'Xã Đông Bình' },
          { code: '31393', name: 'Xã Đông Thuận' },
          { code: '31396', name: 'Xã Thới Tân' },
          { code: '31397', name: 'Xã Trường Thắng' },
          { code: '31399', name: 'Xã Định Môn' },
          { code: '31402', name: 'Xã Trường Thành' },
          { code: '31405', name: 'Xã Trường Xuân' },
          { code: '31408', name: 'Xã Trường Xuân A' },
          { code: '31411', name: 'Xã Trường Xuân B' }
        ]
      }
    ]
  },
  {
    code: '48',
    name: 'Thành phố Đà Nẵng',
    districts: [
      {
        code: '490',
        name: 'Quận Liên Chiểu',
        wards: [
          { code: '20194', name: 'Phường Hòa Hiệp Bắc' },
          { code: '20195', name: 'Phường Hòa Hiệp Nam' },
          { code: '20197', name: 'Phường Hòa Khánh Bắc' },
          { code: '20198', name: 'Phường Hòa Khánh Nam' },
          { code: '20200', name: 'Phường Hòa Minh' }
        ]
      },
      {
        code: '491',
        name: 'Quận Thanh Khê',
        wards: [
          { code: '20203', name: 'Phường Tam Thuận' },
          { code: '20206', name: 'Phường Thanh Khê Tây' }, // Thanh Khê Đông + Tây
          { code: '20209', name: 'Phường Xuân Hà' },
          { code: '20212', name: 'Phường Tân Chính' },
          { code: '20215', name: 'Phường Chính Gián' },
          { code: '20218', name: 'Phường Vĩnh Trung' },
          { code: '20221', name: 'Phường Thạc Gián' },
          { code: '20224', name: 'Phường An Khê' },
          { code: '20225', name: 'Phường Hòa Khê' }
        ]
      },
      {
        code: '492',
        name: 'Quận Hải Châu',
        wards: [
          { code: '20227', name: 'Phường Thanh Bình' },
          { code: '20230', name: 'Phường Thuận Phước' },
          { code: '20233', name: 'Phường Thạch Thang' },
          { code: '20236', name: 'Phường Hải Châu I' },
          { code: '20239', name: 'Phường Hải Châu II' },
          { code: '20242', name: 'Phường Phước Ninh' },
          { code: '20245', name: 'Phường Hòa Thuận Tây' },
          { code: '20248', name: 'Phường Hòa Thuận Đông' },
          { code: '20251', name: 'Phường Nam Dương' },
          { code: '20254', name: 'Phường Bình Hiên' },
          { code: '20257', name: 'Phường Bình Thuận' },
          { code: '20260', name: 'Phường Hòa Cường Bắc' },
          { code: '20263', name: 'Phường Hòa Cường Nam' }
        ]
      },
      {
        code: '493',
        name: 'Quận Sơn Trà',
        wards: [
          { code: '20266', name: 'Phường Thọ Quang' },
          { code: '20269', name: 'Phường Nại Hiên Đông' },
          { code: '20272', name: 'Phường Mân Thái' },
          { code: '20275', name: 'Phường An Hải Bắc' },
          { code: '20278', name: 'Phường Phước Mỹ' },
          { code: '20281', name: 'Phường An Hải Tây' },
          { code: '20284', name: 'Phường An Hải Đông' }
        ]
      },
      {
        code: '494',
        name: 'Quận Ngũ Hành Sơn',
        wards: [
          { code: '20287', name: 'Phường Mỹ An' },
          { code: '20290', name: 'Phường Khuê Mỹ' },
          { code: '20293', name: 'Phường Hoà Quý' },
          { code: '20296', name: 'Phường Hoà Hải' }
        ]
      },
      {
        code: '495',
        name: 'Huyện Hoà Vang',
        wards: [
          { code: '20299', name: 'Xã Hòa Bắc' },
          { code: '20302', name: 'Xã Hòa Liên' },
          { code: '20305', name: 'Xã Hòa Ninh' },
          { code: '20308', name: 'Xã Hòa Sơn' },
          { code: '20311', name: 'Xã Hòa Nhơn' },
          { code: '20314', name: 'Xã Hòa Phú' },
          { code: '20317', name: 'Xã Hòa Phong' },
          { code: '20320', name: 'Xã Hòa Châu' },
          { code: '20323', name: 'Xã Hòa Tiến' },
          { code: '20326', name: 'Xã Hòa Phước' },
          { code: '20329', name: 'Xã Hòa Khương' }
        ]
      },
      {
        code: '497', // Huyện đảo Hoàng Sa, chỉ có tính danh nghĩa
        name: 'Huyện Hoàng Sa',
        wards: [
          // Không có đơn vị hành chính cấp xã thực tế
        ]
      },
      {
        code: '498', // Quận Cẩm Lệ mới
        name: 'Quận Cẩm Lệ',
        wards: [
          { code: '20188', name: 'Phường Khuê Trung' },
          { code: '20332', name: 'Phường Hòa Phát' },
          { code: '20335', name: 'Phường Hòa An' },
          { code: '20338', name: 'Phường Hòa Thọ Tây' },
          { code: '20341', name: 'Phường Hòa Thọ Đông' },
          { code: '20344', name: 'Phường Hòa Xuân' }
        ]
      }
    ]
  },
  {
    code: '46', // Mã tỉnh Thừa Thiên Huế
    name: 'Tỉnh Thừa Thiên Huế',
    districts: [
      // ... các huyện khác của Thừa Thiên Huế (nếu cần)
      {
        code: '474',
        name: 'Thành phố Huế',
        wards: [
          { code: '19888', name: 'Phường Phú Thuận' },
          { code: '19891', name: 'Phường Phú Bình' },
          { code: '19894', name: 'Phường Tây Lộc' },
          { code: '19897', name: 'Phường Thuận Lộc' },
          { code: '19900', name: 'Phường Phú Hiệp' },
          { code: '19903', name: 'Phường Phú Hậu' },
          { code: '19906', name: 'Phường Thuận Hòa' },
          { code: '19909', name: 'Phường Thuận Thành' },
          { code: '19912', name: 'Phường Phú Hòa' },
          { code: '19915', name: 'Phường Phú Cát' },
          { code: '19918', name: 'Phường Kim Long' },
          { code: '19921', name: 'Phường Vỹ Dạ' },
          { code: '19924', name: 'Phường Phường Đúc' },
          { code: '19927', name: 'Phường Vĩnh Ninh' },
          { code: '19930', name: 'Phường Phú Hội' },
          { code: '19933', name: 'Phường Phú Nhuận' },
          { code: '19936', name: 'Phường Xuân Phú' },
          { code: '19939', name: 'Phường Trường An' },
          { code: '19942', name: 'Phường Phước Vĩnh' },
          { code: '19945', name: 'Phường An Cựu' },
          { code: '19948', name: 'Phường An Hòa' },
          { code: '19951', name: 'Phường Hương Sơ' },
          { code: '19954', name: 'Phường Thuỷ Biều' },
          { code: '19957', name: 'Phường Hương Long' },
          { code: '19960', name: 'Phường Thuỷ Xuân' },
          { code: '19963', name: 'Phường An Đông' },
          { code: '19966', name: 'Phường An Tây' },
          // Thêm các phường/xã sáp nhập từ các huyện/thị xã lân cận
          { code: '20098', name: 'Xã Thuỷ Vân' }, // Từ Hương Thủy
          { code: '20110', name: 'Xã Thuỷ Bằng' }, // Từ Hương Thủy
          { code: '19969', name: 'Xã Phú Thượng' }, // Từ Phú Vang
          { code: '19978', name: 'Xã Thuận An' }, // Từ Phú Vang - Lưu ý: Có thể đã lên phường
          { code: '19987', name: 'Xã Phú Dương' }, // Từ Phú Vang
          { code: '19990', name: 'Xã Phú Mậu' }, // Từ Phú Vang
          { code: '19999', name: 'Xã Phú Thanh' }, // Từ Phú Vang
          { code: '20026', name: 'Xã Hương Phong' }, // Từ Hương Trà
          { code: '20032', name: 'Xã Hương Vinh' }, // Từ Hương Trà
          { code: '20050', name: 'Xã Hải Dương' }, // Từ Hương Trà
          { code: '20059', name: 'Xã Hương Thọ' } // Từ Hương Trà
        ]
      }
      // ... các huyện khác của Thừa Thiên Huế
    ]
  },
  {
    code: '75', // Mã tỉnh Đồng Nai
    name: 'Tỉnh Đồng Nai',
    districts: [
      {
        code: '731',
        name: 'Thành phố Biên Hòa',
        wards: [
          { code: '25717', name: 'Phường Trảng Dài' },
          { code: '25720', name: 'Phường Tân Phong' },
          { code: '25723', name: 'Phường Tân Biên' },
          { code: '25726', name: 'Phường Hố Nai' },
          { code: '25729', name: 'Phường Tân Hòa' },
          { code: '25732', name: 'Phường Tân Hiệp' },
          { code: '25735', name: 'Phường Bửu Long' },
          { code: '25738', name: 'Phường Tân Tiến' },
          { code: '25741', name: 'Phường Tam Hiệp' },
          { code: '25744', name: 'Phường Long Bình' },
          { code: '25747', name: 'Phường Quang Vinh' },
          { code: '25750', name: 'Phường Tân Mai' },
          { code: '25753', name: 'Phường Thống Nhất' },
          { code: '25756', name: 'Phường Trung Dũng' },
          { code: '25759', name: 'Phường Tam Hòa' },
          { code: '25762', name: 'Phường Hòa Bình' },
          { code: '25765', name: 'Phường Quyết Thắng' },
          { code: '25768', name: 'Phường Thanh Bình' },
          { code: '25771', name: 'Phường Bình Đa' },
          { code: '25774', name: 'Phường An Bình' },
          { code: '25777', name: 'Phường Bửu Hòa' },
          { code: '25780', name: 'Phường Long Bình Tân' },
          { code: '25783', name: 'Phường Tân Vạn' },
          { code: '25786', name: 'Phường Tân Hạnh' },
          { code: '25789', name: 'Phường Hiệp Hòa' },
          { code: '25792', name: 'Phường Hóa An' },
          { code: '25795', name: 'Xã An Hòa' }, // Đã lên phường An Hòa
          { code: '25798', name: 'Xã Tam Phước' }, // Đã lên phường Tam Phước
          { code: '25801', name: 'Xã Phước Tân' }, // Đã lên phường Phước Tân
          { code: '25804', name: 'Xã Long Hưng' } // Vẫn là xã
        ]
      }
      // ... các huyện/thị xã/thành phố khác của Đồng Nai
    ]
  },
  {
    code: '74', // Mã tỉnh Bình Dương
    name: 'Tỉnh Bình Dương',
    districts: [
      // ... các huyện/thị xã/thành phố khác của Bình Dương (như Thủ Dầu Một, Bến Cát, Tân Uyên...)
      {
        code: '724',
        name: 'Thành phố Thuận An', // Trước là Thị xã Thuận An
        wards: [
          { code: '25624', name: 'Phường An Thạnh' },
          { code: '25627', name: 'Phường Lái Thiêu' },
          { code: '25630', name: 'Phường Bình Chuẩn' },
          { code: '25633', name: 'Phường Thuận Giao' },
          { code: '25636', name: 'Phường An Phú' },
          { code: '25639', name: 'Phường Hưng Định' },
          { code: '25642', name: 'Xã An Sơn' }, // Vẫn là xã
          { code: '25645', name: 'Phường Bình Nhâm' },
          { code: '25648', name: 'Phường Bình Hòa' },
          { code: '25651', name: 'Phường Vĩnh Phú' }
        ]
      },
      {
        code: '725',
        name: 'Thành phố Dĩ An', // Trước là Thị xã Dĩ An
        wards: [
          { code: '25531', name: 'Phường Dĩ An' },
          { code: '25534', name: 'Phường Tân Bình' },
          { code: '25537', name: 'Phường Tân Đông Hiệp' },
          { code: '25540', name: 'Phường Bình An' },
          { code: '25543', name: 'Phường Bình Thắng' },
          { code: '25546', name: 'Phường Đông Hòa' },
          { code: '25549', name: 'Phường An Bình' }
        ]
      }
      // ... các huyện/thị xã/thành phố khác của Bình Dương
    ]
  },
  // ... dữ liệu các tỉnh khác (giữ nguyên nếu có hoặc thêm vào nếu cần)
  {
    code: '82',
    name: 'Tỉnh Tiền Giang',
    districts: [
      {
        code: '815',
        name: 'Thành phố Mỹ Tho',
        wards: [
          { code: '28180', name: 'Phường 5' },
          { code: '28183', name: 'Phường 4' },
          { code: '28186', name: 'Phường 7' },
          { code: '28189', name: 'Phường 3' },
          { code: '28192', name: 'Phường 1' },
          { code: '28195', name: 'Phường 2' },
          { code: '28198', name: 'Phường 8' },
          { code: '28201', name: 'Phường 6' },
          { code: '28204', name: 'Phường 9' },
          { code: '28207', name: 'Phường 10' },
          { code: '28210', name: 'Phường Tân Long' },
          { code: '28213', name: 'Xã Đạo Thạnh' },
          { code: '28216', name: 'Xã Trung An' },
          { code: '28219', name: 'Xã Mỹ Phong' },
          { code: '28222', name: 'Xã Tân Mỹ Chánh' },
          { code: '28225', name: 'Xã Phước Thạnh' }, // Giữ nguyên
          { code: '28228', name: 'Xã Thới Sơn' } // Giữ nguyên
        ]
      }
      // ... thêm huyện khác của Tiền Giang
    ]
  },
  {
    code: '83',
    name: 'Tỉnh Bến Tre',
    districts: [
      {
        code: '829',
        name: 'Thành phố Bến Tre',
        wards: [
          { code: '28243', name: 'Phường Phú Khương' },
          { code: '28246', name: 'Phường Phú Tân' },
          { code: '28249', name: 'Phường 8' },
          { code: '28252', name: 'Phường 6' },
          { code: '28255', name: 'Phường 4' },
          { code: '28258', name: 'Phường 5' },
          { code: '28261', name: 'Phường An Hội' }, // Sáp nhập P1, P2, P3
          { code: '28264', name: 'Phường 7' },
          { code: '28267', name: 'Xã Sơn Đông' },
          { code: '28270', name: 'Xã Phú Hưng' },
          { code: '28273', name: 'Xã Bình Phú' },
          { code: '28276', name: 'Xã Mỹ Thạnh An' },
          { code: '28279', name: 'Xã Nhơn Thạnh' },
          { code: '28282', name: 'Xã Phú Nhuận' }
        ]
      }
      // ... thêm huyện khác của Bến Tre
    ]
  }
  // ... thêm nhiều tỉnh khác nếu cần
]
