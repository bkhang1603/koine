function Page() {
  return (
    <>
      <div
        style={{
          maxWidth: 600,
          margin: '20px auto',
          padding: 20,
          border: '2px solid #007bff',
          borderRadius: 8,
          backgroundColor: '#fff',
          fontFamily: '"Arial", sans-serif'
        }}
      >
        <h2 style={{ color: '#007bff' }}>Koine - Nền tảng giáo dục giới tính cho trẻ em</h2>
        <p style={{ marginBottom: 20 }}>Click this link to register your account at Koine:</p>
        <a
          href='${confirmLink}'
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            textDecoration: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: 5
          }}
          target='_blank'
        >
          Link active your account
        </a>
      </div>
    </>
  )
}

export default Page
