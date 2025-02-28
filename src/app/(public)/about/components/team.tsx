'use client'

import images from '@/assets/images'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const founders = [
  {
    name: 'Le Bao Khang',
    role: 'Co-Founder / CEO',
    avatar: images.teamKhang,
    expertise: ['Product Strategy', 'Business Development'],
    contact: {
      email: 'khang@koine.com',
      phone: '+84 123 456 789'
    },
    socials: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Pham Tuong Vy',
    role: 'Co-Founder / CFO',
    avatar: images.teamVy,
    expertise: ['Financial Planning', 'Operations'],
    contact: {
      email: 'vy@koine.com',
      phone: '+84 123 456 789'
    },
    socials: {
      linkedin: '#',
      github: '#'
    }
  }
]

const teamMembers = [
  {
    name: 'Le Van Dao',
    role: 'Senior Developer',
    avatar: images.teamDao,
    department: 'Engineering'
  },
  {
    name: 'Vu Dan Thuy Huyen',
    role: 'Designer',
    avatar: images.teamHuyen
  },
  {
    name: 'Do Duong Dang Khoa',
    role: 'Developer',
    avatar: images.teamKhoa
  },
  {
    name: 'Pham Thi Van Anh',
    role: 'Designer',
    avatar: images.teamVanh
  }
]

function Team() {
  return (
    <section className='py-32'>
      {/* Phần Người Sáng Lập */}
      <div className='container mb-32'>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              Gặp gỡ <span className='text-primary'>Founders</span>
            </h2>
            <div className='w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full' />
          </div>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className='group'>
                <div
                  className='relative bg-white rounded-[2.5rem] overflow-hidden p-8
                  shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_32px_-8px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_48px_-12px_rgba(0,0,0,0.12)]
                  transition-all duration-300'
                >
                  <div className='flex flex-col md:flex-row gap-8 items-center'>
                    {/* Avatar */}
                    <div
                      className='relative w-48 h-48 rounded-2xl overflow-hidden 
                      ring-4 ring-primary/5 group-hover:ring-primary/10 transition-all duration-300'
                    >
                      <Image src={founder.avatar} alt={founder.name} fill className='object-cover' />
                    </div>

                    {/* Content */}
                    <div className='flex-1 text-center md:text-left'>
                      <h3 className='text-2xl font-bold text-gray-900 mb-2'>{founder.name}</h3>
                      <p className='text-primary font-medium mb-4'>{founder.role}</p>

                      {/* Expertise */}
                      <div className='flex flex-wrap gap-2 justify-center md:justify-start mb-6'>
                        {founder.expertise.map((skill, i) => (
                          <span key={i} className='px-3 py-1 bg-primary/5 rounded-full text-sm text-primary'>
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Contact & Socials */}
                      <div
                        className='flex flex-wrap items-center gap-4 text-gray-600 
                        justify-center md:justify-start'
                      >
                        <a
                          href={`mailto:${founder.contact.email}`}
                          className='flex items-center gap-2 hover:text-primary transition-colors'
                        >
                          <Mail className='w-4 h-4' />
                          <span className='text-sm'>{founder.contact.email}</span>
                        </a>
                        <a
                          href={`tel:${founder.contact.phone}`}
                          className='flex items-center gap-2 hover:text-primary transition-colors'
                        >
                          <Phone className='w-4 h-4' />
                          <span className='text-sm'>{founder.contact.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className='absolute top-8 right-8 flex gap-3'>
                    {Object.entries(founder.socials).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center
                          hover:bg-primary/5 hover:text-primary transition-colors'
                      >
                        {platform === 'linkedin' && <Linkedin className='w-4 h-4' />}
                        {platform === 'github' && <Github className='w-4 h-4' />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phần Thành Viên */}
      <div className='container'>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Đội Ngũ <span className='text-primary'>Xuất Sắc</span>
          </h2>
          <p className='text-gray-600 text-lg mt-4'>Những người trẻ tài năng cùng chung tay xây dựng Koine</p>
          <div className='w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6' />
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className='group relative bg-white p-6 rounded-[2rem] 
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500'
              >
                {/* Phần Ảnh */}
                <div className='relative w-full aspect-square mb-6'>
                  {/* Hình Nền */}
                  <div
                    className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 
                    rounded-[1.5rem] transform transition-transform duration-500
                    group-hover:scale-95'
                  />

                  {/* Ảnh Đại Diện */}
                  <div className='absolute inset-4'>
                    <div
                      className='relative w-full h-full rounded-2xl overflow-hidden
                      ring-1 ring-black/5'
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className='object-cover transition-transform duration-700
                          group-hover:scale-110'
                      />
                    </div>
                  </div>

                  {/* Hiệu Ứng Trang Trí */}
                  <div
                    className='absolute top-0 right-0 w-20 h-20 
                    bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full 
                    blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'
                  />
                  <div
                    className='absolute bottom-0 left-0 w-16 h-16 
                    bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full 
                    blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'
                  />
                </div>

                {/* Nội Dung */}
                <div className='relative text-center'>
                  <h3
                    className='text-lg font-semibold text-gray-900 mb-1 
                    group-hover:text-primary transition-colors duration-300'
                  >
                    {member.name}
                  </h3>
                  <p className='text-sm text-gray-600'>{member.role}</p>

                  {/* Nhãn Bộ Phận */}
                  {member.department && (
                    <div
                      className='absolute -top-4 left-1/2 -translate-x-1/2
                      bg-gradient-to-r from-primary/10 to-secondary/10 
                      text-primary text-xs px-3 py-1 rounded-full
                      opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-2
                      transition-all duration-300'
                    >
                      {member.department === 'Engineering' ? 'Kỹ Thuật' : member.department}
                    </div>
                  )}

                  {/* Đường Kẻ Dưới */}
                  <div
                    className='mt-4 h-0.5 w-12 mx-auto rounded-full
                    bg-gradient-to-r from-transparent via-primary/30 to-transparent
                    transform origin-left scale-0 group-hover:scale-100
                    transition-transform duration-500'
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
