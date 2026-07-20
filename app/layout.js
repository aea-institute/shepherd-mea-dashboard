export const metadata = {
  title: "Mental Edge Academy — The Command Center",
  description:
    "Mental performance training for athletic departments, teams, individuals, and organizations. Powered by Active Brain Management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Buttons don't inherit color/font by default; the dashboard's tiles
            are <button>s that rely on inheriting white text + the -apple-system
            font from their container. */}
        <style>{`button { color: inherit; font: inherit; }`}</style>
      </head>
      <body
        style={{
          margin: 0,
          background: "#000",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </body>
    </html>
  );
}
