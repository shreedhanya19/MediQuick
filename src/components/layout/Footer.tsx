const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PharmaFlow. All rights reserved.</p>
        <p className="mt-1">Your trusted partner in health and wellness.</p>
      </div>
    </footer>
  );
};

export default Footer;
