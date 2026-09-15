need of auth check api...

Nahi — **login/register APIs sirf ek baar** call hoti hain (jab user form submit karta hai). Unse **baar baar poochna** nahi ho sakta "abhi kaun login hai" — kyunki unko email/password chahiye hota hai input me.

Real problem ye hai: **jab app khulta hai (ya refresh hota hai)**, React ko turant pata nahi hota user login hai ya nahi. Us waqt na email hai na password paas me — sirf browser me ek cookie padi hai (agar pehle login kiya tha).

`/auth/check` isiliye chahiye kyunki iska kaam hi ye hai: **"cookie me jo bhi token hai, usse verify karo aur bata do kaun hai"** — bina email/password diye, sirf cookie se hi pehchan leta hai.

## Concrete example se samjho

1. User kal login kiya tha → cookie mil gayi (30 din valid)
2. Aaj user browser band karke phir se site khola
3. React app **fresh load** hua → `user` state khaali hai abhi (kyunki React ki memory reset ho gayi)
4. Ab React ko kaise pata chale user login hai ya nahi? Uske paas na email hai na password — sirf ye pata hai ki **shayad browser me cookie padi ho**

Yahi pe `/auth/check` kaam aata hai — ye call hoti hai **bina kisi input ke**, cookie apne aap request ke saath chali jaati hai (`withCredentials: true` ki wajah se), backend usko verify karke seedha bata deta hai "haan ye user hai" ya "nahi, login karo".

**Login/Register APIs** = jab user **naya** action kare (form bhare)
**Check API** = jab app **khud se** pata karna chahe "already kisi ne login kiya hua toh nahi hai"

Yahi wo gap fill karta hai jo tumhe pehle face hua tha — Unwind me app reopen karne pe seedha Signup page dikhta tha, kyunki wahan ye "check" wala mechanism tha hi nahi.