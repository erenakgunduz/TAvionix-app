import AuthForm from '../../components/AuthForm/AuthForm';

export default function Home() {
  return (
    <div>
      <div>
        <h1>Supabase Auth + Storage</h1>
        <p>
          Experience our Auth and Storage through a simple profile management example. Create a user
          profile and upload an avatar image. Fast, simple, secure.
        </p>
      </div>
      <div>
        <AuthForm />
      </div>
    </div>
  );
}
