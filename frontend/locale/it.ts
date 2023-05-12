export const itDict = {
       login: {
        title: "Accedi",
        username: "username",
      password: "Password",
      submit: "Invia",
      password_show: "Mostra",
    },
    submit: "Invia",
    edit: "Modifica",
    sidebar: {
        dashboard: "cruscotto",
        users: "Utenti",
        ticketList: "Elenco biglietti",
        summary: "Sommario",
        viewers: "Spettatori",
        profile: "Profilo",
    },
    pagination: {
      perPage: "Per pagina",
    },
    dashboard: {
      title: "Gestore - Dashboard",
      header: "Dashboard",
      today_card: {
        title: "Rapporto di oggi",
        turnover: "Fatturato",
        profit: "profitto",
        shopcount: "Attivo",
        dogs6: "Cani6,",
        horses6: "Cavalli6",
      },
      weekly_report: {
        title: "Scarica rapporto settimanale",
        button: "Scarica",
      },
      chart: {
        title: " Grafico del rapporto",
        start_date: "Data di inizio",
        end_date: "Data di fine",
        button: "Aggiorna",
      },
    },
    user: {
      title: "Gestore - Utenti",
      header: "Utenti",
      tavolo: {
        username: "Username",
        level: "Livello",
        created_at: "Creato il",
        updated_at: "Aggiornato alle",
      },
      panel: {
        title_details: "Dettagli utente",
        title_create: "Creazione utente",
        username: "username",
        livello: "Livello",
        password: "Password",
        password_button: "Mostra",
        confirm_password: "Conferma password",
        lingua: {
          etichetta: "Lingua",
          predefinito: "Seleziona un'opzione",
          inglese: "Inglese - United",
        },
        button_edit: "Modifica",
        abilitato: "Abilitato",
        Avanzate: {
          title: "Avanzato",
          pulsante: "Elimina",
        },
      },
      profilo: {
        username: "username: ",
        operatore: "Operatore: ",
      },
    },
    biglietto: {
      da: "Da",
      a: "A ",
      pulsante: {
        aggiornamento: "Aggiorna",
        filtro: "Filtri avanzati",
      },
      elenco: {
        title: "Manager - Biglietti",
        header: "Elenco biglietti",
      },
      riepilogo: {
        title: "Manager - Riepilogo",
        header: "Riepilogo",
      },
      tipo: {
        transazione: {
          Lo: "ho fatto",
          external_id: "ID esterno",
          username: "Utente",
          digitare: "Tipo",
          tempo: "Tempo",
          quantità_in: "In",
          amount_out: "Fuori",
          stato: "Stato",
        },
        transazioni_negozi: {
          id: "#",
          user_id: "ID",
          digitare: "Tipo",
          tempo: "Tempo",
          amount_id: "In",
          amount_out: "Fuori",
        },
        utenti_transazioni: {
          id: "#",
          tempo: "Tempo",
          currency_id: "Valuta",
          quantità_in: "In",
          amount_out: "Fuori",
          stato: "Stato",
        },
        riepilogo: {
          attivo: "Attivo",
          in: "In",
          fuori_fuori: "",
          profitto: "profitto",
          biglietti: "Biglietti",
        },
        sommario_negozi: {
          id_negozio: "",
          sommaIn: "",
          sumOut: "",
          cancatPercentage: "",
        },
        riassuntoutenti: {},
      },
      filtro_anticipo: {
        user_type: "Filtra per tipo di utente",
        digitare: "Tipo",
        da: "Da",
        a: "A",
        group_by: "Raggruppa per",
        pulsante: "Invia",
        L: "ho fatto ",
        filtri: {
          title: "Filtra per utenti",
          Tutto_tutto:"",
          negozi: "Negozi",
          utenti: "Chioschi e player",
          searchNfilterTitleUsers: "ID utente",
          searchNfilterTitleShops: "ID negozio",
          tipo: {
            etichetta: "Tipo",
            transazione: "Lista",
            sommario: "sommario",
          },
          raggruppa_per: {
            default: "Seleziona Raggruppa per ",
            negozi: "Negozi",
            utenti: "Utenti",
          },
        },
      },
      pannello: {
        dettagli: "Dettagli biglietto: ",
        filtri: "Filtri",
      },
    },
    spettatore: {
      tavolo: {
        L:"ho fatto",
        macaddress: "Macaddress",
        utente: "utente",
        monitorare: "monitorare",
        canale: "Canale",
        lingua: "Lingua",
        URL: {
          pulsante: "URL",
          title: "URL del video",
        },
      },
      pannello: {
        macaddress: "Macaddress",
        utente: "Utente",
        monitorare: "Controllare",
        canale: "Canale",
        lingua: "Lingua",
        video_url: "URL video",
        pulsante: "Modifica",
        Avanzate: {
          title: "Avanzato",
          pulsante: "Elimina",
        },
      },
    },
    predefinito: "Seleziona un'opzione",
    ingresso: {
      select_default: "Seleziona un'opzione",
    },
    profilo: {
        pulsante: "Profilo",
        pannello: {
          nome_utente: "Nome utente: ",
          password: "Password",
          confirm_password: "Conferma password",
        },
      },
      dark_mode: "Modalità oscura",
      guida: {
        pulsante: {
          salta: "Salta",
          successivo: "Avanti",
          startTour: "Tour",
          smt:"indietro_indietro",
          chiudi: "Chiudi",
          ultimo: "Ultimo",
          open: "Apri la finestra di dialogo",
        },
    tour: {
        scaricarapporto_settimanale: {
          domanda:
            "Come posso scaricare un rapporto settimanale in un file che posso aprire con Excel?",
          risposta:
            "Vai alla pagina Dashboard, seleziona la settimana desiderata, quindi fai clic sul pulsante Download.",
          passi: [
            {
              title: "Vai alla pagina dashboard.",
              content: "Fai clic sul pulsante in alto!",
            },
            {
              title: "Benvenuto nella pagina Dashboard",
            },
            {
              title: "Questo è un contenitore di rapporti settimanali",
            },
            {
              title: "Seleziona la settimana desiderata",
            },
            {
              title: "Fai clic su download",
            },
            {
              title: "Fai clic sul pulsante in alto!",
            },
            {
              title: "Questo è il tour che hai finito",
            },
          ],
        },
        crea_un_nuovo_account: {
          domanda: "Come posso creare un nuovo account per il mio collega?",
          risposta: "Vai alla pagina utente. Fai clic sul pulsante più.",
          passi: [
            {
              title: "1 Vai alla pagina utente.",
              content: "Fai clic sul pulsante in alto!",
            },
            {
              title: "2 Benvenuto nella pagina utente",
            },
            {
              title: "3 Questo è il pulsante Crea utente",
              content: "Fai clic sul pulsante in alto!",
            },
            // {
            // title: "4 Questo è il pulsante Crea utente",
            // content: "Dove crei un nuovo account",
            // },
            // {
            // title: "Inserisci username",
            // content: "Inserisci il username dell'account ",
            // },
            // {
            // title: "Seleziona un livello di account",
            // },
            // {
            // title: "Inserisci password",
            // },
            // {
            // title: "Conferma la password che hai inserito nell'input precedente",
            // },
            // {
            // title: "Fai clic su crea",
            // },
            // {
            // title: "Congratulazioni hai creato un nuovo account ",
            // },
          ],
        },
      },
    },
    error: {
      errore: "Errore",
      avviso: "Attenzione",
      auth: "Autenticazione fallita",
      no_result: "Nessun risultato trovato.",
      ticket: "Impossibile aggiornare i ticket",
      ticketshops: "Impossibile aggiornare i biglietti del negozio",
      // ticket_shops: "Biglietto"
      data: "Impossibile recuperare i dati.",
      viewerCreate: "Impossibile creare il visualizzatore",
      viewerDetails: "Impossibile aprire i dettagli del visualizzatore.",
      viewerDelete: "Impossibile eliminare il visualizzatore.",
      viewerUpdate: "Impossibile aggiornare il visualizzatore.",
      ticketFilter: "Impossibile filtrare i ticket.",
      userDetails: "Impossibile aprire i dettagli dell'utente.",
      userCreate: "Impossibile creare l'utente.",
      userDelete: "Impossibile eliminare l'utente.",
      userUpdate: "Impossibile aggiornare l'utente.",
      userProfile: "Impossibile aggiornare il tuo profilo.",
    },
    successful: {
      ticketFilter: "Biglietti filtrati con successo!",
      viewerDetails: "Visualizzatore aggiornato con successo!",
      viewerDelete: "Visualizzatore eliminato con successo!",
      viewerCreate: "Impossibile creare il visualizzatore",
      viewerCreateReq: "Impossibile ricevere i dati del visualizzatore",
      ticket_shops: "Biglietti aggiornati per il negozio: ",
      userCreate: "Utente creato con successo!",
      userEdit: "Aggiornamento utente riuscito!",
      userDelete: "Utente cancellato con successo!",
      userUpdate: "Utente aggiornato con successo!",
      userDetails: "Il tuo profilo è stato aggiornato con successo.",
    },
};
