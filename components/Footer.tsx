export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 bg-(--color-footer) mt-8 rounded-t-lg">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Finance Hub. All rights reserved.
      </p>
    </footer>
  );
}
