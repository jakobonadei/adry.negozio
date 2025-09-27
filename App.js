import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [newClient, setNewClient] = useState("");
  const [newService, setNewService] = useState("");

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const clientsSnapshot = await getDocs(collection(db, "clients"));
      setClients(clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const servicesSnapshot = await getDocs(collection(db, "services"));
      setServices(servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const appointmentsSnapshot = await getDocs(collection(db, "appointments"));
      setAppointments(appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const addClient = async () => {
    await addDoc(collection(db, "clients"), { name: newClient });
    setNewClient("");
    alert("Cliente aggiunto!");
  };

  const addService = async () => {
    await addDoc(collection(db, "services"), { name: newService });
    setNewService("");
    alert("Servizio aggiunto!");
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Gestione Salone Parrucchiera</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Clienti</h2>
          <input
            className="border p-2 w-full my-2"
            value={newClient}
            onChange={(e) => setNewClient(e.target.value)}
            placeholder="Nome Cliente"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addClient}>Aggiungi Cliente</button>
          <ul className="mt-2">
            {clients.map(c => <li key={c.id}>{c.name}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Servizi</h2>
          <input
            className="border p-2 w-full my-2"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Nome Servizio"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addService}>Aggiungi Servizio</button>
          <ul className="mt-2">
            {services.map(s => <li key={s.id}>{s.name}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Appuntamenti</h2>
          <ul>
            {appointments.map(a => <li key={a.id}>{a.client} - {a.date}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
