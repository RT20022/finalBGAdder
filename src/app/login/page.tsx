'use client'

export default function Login() {

  async function handleclick() {
    const params = new URLSearchParams({
      client_id: "Ov23lik3YSNDborzdlPW",
      state: "RadhaKrishn",
      redirect_uri: "http://localhost:3000/api/auth/github",
      scope: "repo user",
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params}`
  }


  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-slate-100 via-slate-400 to-slate-600 flex justify-center items-center">
        <hr className="mt-3" />
        <div className="mt-3 flex justify-center"><button className="rounded-4xl shadow text-2xl bg-blue-400 px-7 py-4 mt-8" onClick={handleclick}>Login Using Github</button>
        </div>
      </div>
    </>
  )
}