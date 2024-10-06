export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="relative flex min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-0 "
          style={{ backgroundImage: "url('/girl2.jpg')" }}
        ></div>
  
        {/* Overlay and Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-10 bg-white/80">
          {children}
        </div>
      </div>
    );
  }
  