import React, { useContext, useEffect, useState } from "react";
import { requestTicketDetails } from "@/hooks/tickets";
import { TicketDetails } from "@pg-ui/pgv";
import { Loader } from "@pg-ui/components";
import { PlacedTicket, Ticket } from "@pg-ui/pgv";
import { Dict } from "@pg-ui/i18n";
import "./PanelTicketDetails.scss";
import { AsidePanelContext } from "@/context";

type PanelTicketDetailsProps = {
  ticketId: string;
};
const PanelTicketDetails = ({ ticketId }: PanelTicketDetailsProps) => {
  const { closeAsidePanel } = useContext(AsidePanelContext),
    customRows = [],
    isOneColumn = false,
    isUserRetail = true;
  const [dict, setDict] = useState(new Dict());

  const [isWaitingForResponse, setIsWaitingForResponse] = useState(true);
  const [ticket, setTicket] = useState<PlacedTicket>();

  const INFO_ROWS = [
    //'ticket_id', 'time',
    //'paydate',
    "betType",
    ...(isUserRetail ? ["paydate"] : []),
    "status",
    "amount_won",
    ...(isUserRetail ? ["terminal", "datePayment", "dateCancellation"] : []),
    "amount",
    "potential_max_win",
  ];
  const TABLE_COLUMNS = [
    "game_id",
    "palimpsest_id",
    "event_id",
    "market_id",
    "odds",
    "multiplier",
    "status",
  ]; //['eventid', 'selection', 'odds', 'multi', 'status'];

  const onCloseButtonClick = () => {
    closeAsidePanel();
  };

  useEffect(() => {
    requestTicketDetails({
      params: { ticketId: ticketId },
      onSuccess: (res) => {
        setIsWaitingForResponse(false);
        setTicket(new PlacedTicket().fromJSON(res));
        dict.setData(res.dict);
      },
      onError: () => {
        setIsWaitingForResponse(false);
      },
    });
  }, []);

  if (isWaitingForResponse || !ticket) return <Loader />;

  return (
    <TicketDetails
      showHeader={false}
      dict={dict}
      ticket={ticket}
      isUserRetail={isUserRetail}
      isOneColumnLayout={isOneColumn}
      onCloseButtonClick={onCloseButtonClick}
      customRows={customRows}
      partnerName={"pg"}
    />
  );
};

export default PanelTicketDetails;
