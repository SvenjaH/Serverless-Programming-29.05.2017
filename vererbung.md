# 6.4 Vererbung

Die *Vererbung* stellt in objektorientierten Datenbanken einen wichtigen Bereich dar. Durch sie ist es möglich verschiedene Klassen miteinander zu verbinden und sich deren Attribute und Methoden zu nutze zu machen. Dabei kann eine Klasse die Eigenschaften einer anderen erben oder sie selbst an Klassen vererben. Diese Klassen stehen dann jeweils in Beziehung zueinander, was grafisch verdeutlicht wird durch die Verwendung verschiedener Symbole, die eindeutig aufzeigen wer von wem erbt (vgl. HUGHES, 1992, S. 53).   
Es wird zwischen unterschiedlichen Arten der Vererbung unterschieden:

- **Mehrfachvererbung:**   
  Eine Klasse erbt von mehreren anderen Klassen und nutzt deren Attribute und Methoden (vgl. HEUER, 1997, S. 209f.)
- **Einfache Vererbung:**   
  Jede Klasse darf nur von einer anderen Klasse erben und deren Attribute verwenden. (vgl. HEUER, 1997,S. 209f.)
- **Wertevererbung:**   
  In Objektorientierten Datenbanken können auch die Werte der Attribute einer Klasse mit vererbt werden. (vgl. HEUER, 	   1997, S. 206)

Dabei ist zu beachten, dass nicht jede Sprache die Möglichkeit der Mehrfachvererbung anbietet. Im Bereich der objektorientierten Datenbanken gehört dies jedoch zu den gängigen Umsetzungen (vgl. HEUER, 1997, S. 209f.).   
Durch die Deklaration einer Klasse als *privat* kann hingegen erreicht werden, dass deren Methoden nicht an andere Klassen vererbt werden können. Dies zeigt, dass es recht viele Möglichkeiten in der Vererbung gibt, die je nach Szenario verwendet werden können. Dies bietet eine hohe Flexibilität und schafft die Möglichkeit eines Aufbaus nach Wunsch (vgl. HEUER, 1997, S. ).

Bei Klassen einer hierarchischen Beziehungsstruktur kommt der Begriff der *Generalisierung* zum Tragen. Diese besagt, dass Klassen in übergeordnete oder untergeordnete Subklassen verfeinert werden. Der Begriff der *Spezialisierung* hingegen befasst sich mit der inversen Sicht. Dabei werden eine Klasse oder mehrere Subklassen erzeugt, die die übergeordnete Klasse verfeinern. Das Prinzip der Generalisierung und Spezialisierung sind Beziehungen, die durch die Möglichkeit der Vererbung in objektorientierten Datenbanken realisiert werden (vgl. MEIER & WÜST, 2000, S. 30).

Das Prinzip der Vererbung hilft nicht nur eine übersichtliche Struktur zu gestalten und unnötige doppelte Attribute zu vermeiden. Ferner wird es auch verwendet, um eben diese Beziehungen zwischen den Klassen aufzuzeigen und deutlich zu machen, welche Klassen auf die gleichen Attribute zurückgreifen und somit einen leichteren Aufbau einer Datenbank zu ermöglichen. Weiterhin ist die Vererbung gerade für größere Unternehmen und Projekte als sehr hilfreich anzusehen. Bei einem großen Umfang einer Anwendung ist es umso wichtiger, dass die einzelnen Programmierer, die an dieser arbeiten, sofort erkennen können wie die einzelnen Elemente zusammenarbeiten. Es muss davon ausgegangen werden, dass neue Angestellte in das Projektteam gelangen und diese müssen sich ohne lange Einarbeitungszeit zurecht finden (vgl. HUGHES, 1992, S. 69).   
Auch der Faktor der Erweiterbarkeit eines Projekts ist durch die Möglichkeit der Vererbung weniger risikoreich. So können Änderungen und Neuerungen einfacher in das System eingebaut bzw. entfernt werden ohne die Struktur an sich komplett verändern zu müssen. Dies spart viel Aufwand und ist gerade für Unternehmen ein wichtiger Kostenfaktor (vgl. HUGHES, 1992, S. 69).