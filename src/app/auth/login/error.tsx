"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-[60vh] flex items-center justify-center p-6">
			<div className="max-w-md w-full text-center">
				<h2 className="text-xl font-semibold text-slate-800 mb-2">
					Login failed
				</h2>
				<p className="text-slate-600 mb-4">Please try again.</p>
				<div className="flex gap-3 justify-center">
					<button
						onClick={() => reset()}
						className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
					>
						Try again
					</button>
					<button
						onClick={() => (window.location.href = "/auth/login")}
						className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
					>
						Back to login
					</button>
				</div>
			</div>
		</div>
	);
}
