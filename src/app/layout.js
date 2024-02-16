import './globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import Provider from '@/components/providers';


export default function RootLayout({ children }) {

  return (
    <>
    <html lang="en">
    <head />
  <body>
             <Provider>
               {children}      
               </Provider>      
 
      </body>
    </html>
    </>
  )
}
