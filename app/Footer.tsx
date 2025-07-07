export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 bg-(--color-footer) mt-8 rounded-t-lg">
      <p className="text-sm mr-4 ml-4">
        &copy; {new Date().getFullYear()} Finance Hub. All rights reserved.
      </p>
      <p className="text-sm mr-4 ml-4">TY Mr. Carrier</p>
      <p className="text-sm mr-4 ml-4">
        Developed by <a href="https://github.com/jpatrick5402">JP</a>
      </p>
    </footer>
  );
}
