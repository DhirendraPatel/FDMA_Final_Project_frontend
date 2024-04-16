import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
	return (
		<footer className="py-6 mt-2  bg-slate-100 text-black">
				<div className="" style={{display: "flex"}}>
					<div>
					<span className="self-center text-2xl font-semibold" style={{marginLeft: "10%"}}>FOODIE</span> <br/> <br/>
					<p style={{marginLeft: "10%"}}>"We're here to bring deliciousness  <br/>right to your doorstep. <br/> Order now and let the feasting begin!"</p>
					</div>
					<div className="" style={{marginLeft: "20%"}}>
					<span className="self-center text-2xl font-semibold" style={{marginLeft: "0%"}}>Quick Links</span> <br/> <br/>
						<Link to="/AfterHome"><p>Home</p></Link>
						<Link to="/About"><p>About Us</p></Link>
						<p>Contact Us</p>
						<p>Services</p>
					</div>
					<div className="footer-grid-item" style={{marginLeft: "5%"}}>
					<span className="self-center text-2xl font-semibold" style={{marginLeft: "0%"}}>Have a Question ?</span> <br/> <br/>
						<p>1202&1215A, 3rd Floor, Regus</p>
						<p>SL Jubilee, Rd No:36, Jublee Hills</p>
						<p>+91-040-6793 2204</p> <br/>
						<Link to="#" className="text" style={{color: "red"}}>
						hr@anarghyacommunicationscom.in
						</Link>
					</div>

          <div className="footer-grid-item">
			<iframe
				width="200"
				height="150"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.496901244075!2d78.38557791481668!3d17.431734987840805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb919a7b36eefb%3A0x570f86cb2257533!2sCapital%20Park%2C%20Madhapur!5e0!3m2!1sen!2sin!4v1648611546098!5m2!1sen!2sin"
				loading="lazy"
			></iframe>

          </div>
				</div>
				
				<div className=" justify-center text-center pt-4 lg:justify-between">
					<div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
						<span>©2023 All rights reserved</span>
						<a rel="noopener noreferrer" href="/">
							<span>Privacy policy</span>
						</a>
						<a rel="noopener noreferrer" href="/">
							<span>Terms of service</span>
						</a>
					</div>
					{/* <div className='flex flex-row sm:items-auto justify-center text-center py-3 lg:items-auto gap-3'>
						<a target='blank' href="/"><button className='border border-[#FF6600]/80 rounded-full py-1 px-4 hover:bg-[#FF6600]/80 transition duration-300 easeinout'>Whatsapp</button></a>
						<a target='blank' href="https://www.linkedin.com/in/usamariazur/"><button className='border border-[#FF6600]/80 rounded-full py-1 px-4 hover:bg-[#FF6600]/80 transition duration-300 easeinout'>Linkedin</button></a>
						<a target='blank' href="https://github.com/usamariaz2"><button className='border border-[#FF6600]/80 rounded-full py-1 px-4 hover:bg-[#FF6600]/80 transition duration-300 easeinout'>Github</button></a>
						<a target='blank' href="https://github.com/usamariaz2"><button className='border border-[#FF6600]/80 rounded-full py-1 px-4 hover:bg-[#FF6600]/80 transition duration-300 easeinout'>Twitter</button></a>

						<a target='blank' href="https://github.com/usamariaz2"><button className='border border-[#FF6600]/80 rounded-full py-1 px-4 hover:bg-[#FF6600]/80 transition duration-300 easeinout'>Facebook</button></a>


					</div> */}

				</div>

		</footer>
	)
}
