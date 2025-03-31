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
      }
      // ... thêm nhiều quận huyện khác của Hà Nội
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
        code: '764',
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
      }
      // ... thêm nhiều quận khác của TP.HCM
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
          { code: '20206', name: 'Phường Thanh Khê Đông' },
          { code: '20207', name: 'Phường Thanh Khê Tây' },
          { code: '20209', name: 'Phường Xuân Hà' },
          { code: '20212', name: 'Phường Tân Chính' },
          { code: '20215', name: 'Phường Chính Gián' },
          { code: '20218', name: 'Phường Vĩnh Trung' },
          { code: '20221', name: 'Phường Thạc Gián' },
          { code: '20224', name: 'Phường An Khê' },
          { code: '20225', name: 'Phường Hòa Khê' }
        ]
      }
      // ... thêm quận khác của Đà Nẵng
    ]
  },
  // ... thêm nhiều tỉnh khác
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
          { code: '28225', name: 'Xã Phước Thạnh' },
          { code: '28228', name: 'Xã Thới Sơn' }
        ]
      }
      // ... thêm huyện khác
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
          { code: '28261', name: 'Phường An Hội' },
          { code: '28264', name: 'Phường 7' },
          { code: '28267', name: 'Xã Sơn Đông' },
          { code: '28270', name: 'Xã Phú Hưng' },
          { code: '28273', name: 'Xã Bình Phú' },
          { code: '28276', name: 'Xã Mỹ Thạnh An' },
          { code: '28279', name: 'Xã Nhơn Thạnh' },
          { code: '28282', name: 'Xã Phú Nhuận' }
        ]
      }
      // ... thêm huyện khác
    ]
  }
  // ... thêm nhiều tỉnh khác
]
