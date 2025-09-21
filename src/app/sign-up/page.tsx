import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join WellBalance</h1>
          <p className="text-gray-600">Create your account to start your wellness journey</p>
        </div>
        <SignUp 
          routing="hash"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
