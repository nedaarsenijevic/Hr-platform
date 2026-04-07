# HR platform
Tokom izrade zadatka, uvela sam i dodatnu tabelu za kategorije veština, iako to nije bilo eksplicitno traženo. To je bila moja inicijalna ideja kako bih bolje organizovala podatke, ali mi je oduzelo određeno vreme koje sam potencijalno mogla da iskoristim za implementaciju JUnit testova. Ipak, posmatrano iz ugla realnog sistema, ovakav pristup može biti koristan za HR procese jer omogućava bolju klasifikaciju i pregled veština.

Takođe, odlučila sam da implementiram Strategy obrazac za pretragu kandidata. Kroz interfejs SearchStrategy i njegove implementacije omogućila sam različite načine pretrage (po imenu i po veštini), čime je logika pretrage izdvojena i učinjena fleksibilnijom za proširenje. Iako je ista funkcionalnost mogla biti odradjena i bez ovog obrasca, korišćenje Strategy patterna omogućava lakše dodavanje novih kriterijuma pretrage.

Generalno, zadatak mi je bio zanimljiv za rad. Neke odluke koje sam donela možda prevazilaze minimalne zahteve zadatka, ali sam želela da ga sagledam i iz perspektive realnog sistema i potencijalne primene u praksi.
