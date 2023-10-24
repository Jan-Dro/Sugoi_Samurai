import { Button } from "@nextui-org/react";


export default function LoginForm({ formData, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
        />
      </div>
      <Button type="submit" variant="primary" className="signin-button">
        Sign In
      </Button>
    </form>
  );
}