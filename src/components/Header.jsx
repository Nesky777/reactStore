function Header({ user }) {
  return (
    <div style={{ position: "sticky", top: 0 }}>
      <p>{user.name}</p>
      <h1>Sklep internetowy</h1>
    </div>
  );
}

export default Header;
