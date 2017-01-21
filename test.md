#6.3 Klassen

Eine Klasse ist eine Schablone, aus der neue Objekte erzeugt werden können, die dann die an der Schnittstelle definierten Operationen besitzen. Sie stellt eine Menge von Objekten mit Attributen dar (vgl. HEUER, 1997, S. 219).   
Ein Attribut wird nur ein mal pro Klasse angelegt und bleibt dann bestehen.
Es existieren unterschiedliche Arten von Klassen, welche nachfolgend kurz erläutert werden sollen (vgl. MEIER & WÜST, 2000, S. 22).   
Zum Einen werden Klassen anhand ihrer Position in der Klassenhierarchie benannt. Dabei gibt es die Unterscheidung zwischen Unter- und Oberklasse. Eine Oberklasse steht wie der Name bereits vermuten lässt in der Hierarchie auf einer oberen Ebene und kann ihre Attribute und dessen Werte an die darunter liegenden Ebenen weitergeben. Die Unterklassen befinden sich in der Hierarchie auf den unteren Ebenen und erben Attribute und dessen Werte von den Oberklassen. Damit sind diese miteinander verknüpft und teilen sich die Informationen, die sie jeweils beinhalten. Ein Programmierer kann somit bei jeder Klasse, die er neu erstellt entscheiden, welche Position sie in der Hierarchie hat und welche Eigenschaften ihr somit zugeordnet werden können (vgl. HEUER, 1997, S. 175f.).   
Die Definition einer Klasse in einer objektorientierten Programmiersprache umfasst Attribute und Methoden, die je nach Programmiersprache unterschiedlich eingekapselt sein können.
Eine andere Art ist ebenfalls an dieser Stelle zu nennen und diese wird als Metaklasse benannt. Bei einer Metaklasse können die Objekte dieser Klasse selber eine solche darstellen. Dabei besitzen Metaklassen die gleichen Elemente wie jede andere Klasse auch, wozu auch Variablen und ein Protokoll zählen. Ein Protokoll wird dabei als die Menge aller Meldungsnachrichten welcher eine Klasse zur Verfügung hat (vgl. HEUER, 1997, S. 217f.).
Es können 2 Unterarten der Metaklasse unterschieden werden:

**- Implizite Metaklasse:** 
	Hierbei wird der Aufbau der Klasse vom System entschieden und ausgeführt, womit dieses die 								Verwaltung übernimmt. Der Programmierer muss somit in diesem Fall selber keine Leistung 								erbringen, hat aber auch keinen Einfluss auf den Aufbau (vgl. HEUER, 1997, S. 217f.).   
**- Explizite Metaklasse:** 
	Im Gegenteil zur impliziten kann hier der Programmierer die Struktur der Klasse selber 								 	 festlegen und hat damit die volle Kontrolle über den Aufbau und Inhalt. Er muss dabei 								    	jedoch aufpassen, dass er keine Fehler einbaut und er sich möglichst an eine gewisse Logik 							 	 hält (vgl. HEUER, 1997, S. 217f.).

Weiterhin kann eine Klasse Methoden besitzen, die in ihr gespeichert sind. Kommt es durch die Klassenhierarchie und die Beziehung zwischen den einzelnen Klassen zu einer Vererbung, so können auch die Methoden einer Oberklasse von darunterliegenden Erben verwendet werden. Die Aufgabe von Klassenmethoden ist es maßgeblich, dass diese Aufgaben der Klasse übernimmt. Somit wird also immer nur ein Teil der Klasse angesprochen und nur die Methode, die die jeweilige Aufgabe die benötigt wird ausführt, wird aktiv (vgl. MEIER & WÜST, 2000, S. 22).   
Sobald eine Klasse erstellt wird, existieren immer Methoden und auch Eigenschaften, die sozusagen gesetzt sind, egal ob sie benötigt werden oder nicht. Dadurch wird eine Art Einheitlichkeit der Klassen gewährleistet. Weiterhin ist dem Programmierer dann bekannt, dass diese fixen Bestandteile definitiv in jeder Klasse existent sind und er diese nicht erstellen muss (vgl. MEIER & WÜST, 2000, S. 23).   
Eine andere Art von Klassen stellen die Beziehungsklassen dar. Diese zeichnen sich dadurch aus, dass sie von mindestens 2 anderen Klassen der Hierarchie abhängig ist. Sie besitzt zwar eigene Attribute, ist jedoch von den Inhalten und Methoden der anderen Klassen abhängig und kann somit nicht selbstständig arbeiten.
Die abstrakten Klassen sind eine weitere Klassenart, eigentlich keine richtige Klasse sind. Sie sind lediglich künstliche Klassen, die dazu da sind Objektmengen zu verallgemeinern (vgl. MEIER & WÜST, 2000, S. 34f.).   
Bei einer persistenzfähigen Klasse werden die Attribute dauerhaft in der Datenbank gespeichert (vgl. MEIER & WÜST, 2000, S. 40). Dabei können diese Klassen zwei verschiedene Objektarten in sich tragen: 

→	transiente Objekte: Sie sind dauerhafte Objekte, die ihren Zustand von Zeit zu Zeit abspeichern, so dass nach 								einem Absturz des Systems der letzte Zustand wiederhergestellt werden kann (vgl.MEIER & WÜST, 							2000, S. 40).
→	persistente Objekte: Sie sind nicht dauerhaft und speichern somit ihren Zustand nicht ab. Kommt es zu einem 								   Systemabsturz, so existiert dieses Objekt nicht mehr und muss erst neu erstellt werden 								   (vgl. MEIER & WÜST, 2000, S. 40).

Bei einer objektorientierten Datenbank werden die Klassendefinitionen und die Instanziierungen der jeweiligen Klasse gespeichert. Dadurch sind diese einwandfrei identifizierbar. 
In den ersten Versionen von objektorientierten Datenbanken und deren Systeme waren Klassen nach außen hin nicht geschützt und es konnte somit auf alle Attribute zugegriffen werden. Dies stellte ein Sicherheitsproblem dar, da so bei einem Fehler in der Datenbank der Inhalt der Attribute eingesehen werden konnte von Teilen des Systems, welche dazu keine Berechtigung haben sollten (vgl. HEUER, 1997, S. 175).

Zwischen Klassen können unterschiedliche Beziehungen herrschen. Diese erhalten insbesondere bei einer grafischen Umsetzung der Struktur einer Datenbank eine große Bedeutung. Jede Art der Beziehung wird durch verschiedene Darstellungsarten gekennzeichnet. Diese sind weltweit gültig und somit überall auf die gleiche Art und Weise deutbar.
Dabei gibt es unterschiedliche Kombinationsmöglichkeiten:

	→	ausgehend von Oberklasse zu Unterklasse
	→	ausgehend von Unterklasse zu Oberklasse (vgl. HEUER, 1997, S. 193)

Bei der Erstellung einer Klasse sollte unbedingt auf deren Namensgebung besonderes Augenmerk gelegt werden. Denn ist dieser nicht eindeutig mit dem Inhalt der Klasse identifizierbar, so kommt es zu eventuellen Missverständnissen und Kommunikationsproblemen. Deshalb sollte der Klassenname immer inhaltlich auf die Klasse hinweisen. 