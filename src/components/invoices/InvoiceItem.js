import React from "react";
import {
  Button,
  Icon,
  Modal,
  Table,
  Header,
  List,
  Accordion,
  Segment,
} from "semantic-ui-react";

function InvoiceModal({
  invoice,
  isOpen,
  onClose,
  activeIndex,
  handleClick,
  formatDate,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} size="fullscreen" dimmer="blurring">
      {invoice !== null ? (
        <>
          <Modal.Header>
            <Icon name="file alternate outline" /> Invoice Details -{" "}
            {invoice.invoice_number}
          </Modal.Header>
          <Modal.Content>
            <Segment color="blue">
              <List>
                <List.Item>
                  <Icon name="user" /> Customer: {invoice.customer.first_name}{" "}
                  {invoice.customer.last_name}
                </List.Item>
                <List.Item>
                  <Icon name="phone" /> Phone: {invoice.customer.phone}
                </List.Item>
                <List.Item>
                  <Icon name="mail" /> Email: {invoice.customer.email}
                </List.Item>
              </List>
            </Segment>

            <Header as="h3" color="teal">
              <Icon name="medkit" /> Prescription
            </Header>
            <Table celled color="teal">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Sphere (Left)</Table.Cell>
                  <Table.Cell>{invoice.prescription.left_sphere}</Table.Cell>
                  <Table.Cell>Sphere (Right)</Table.Cell>
                  <Table.Cell>{invoice.prescription.right_sphere}</Table.Cell>
                </Table.Row>
                {/* Add additional rows for other prescription fields if they are not null */}
              </Table.Body>
            </Table>

            <Header as="h3" color="orange">
              <Icon name="box" /> Items
            </Header>
            <Table celled color="orange">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invoice.inventory_items.map((item) => (
                  <Table.Row key={item.inventory_item.id}>
                    <Table.Cell>{item.inventory_item.name}</Table.Cell>
                    <Table.Cell>{item.inventory_item.description}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>${item.sale_value}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <Segment inverted color="green">
              <List horizontal divided inverted relaxed>
                <List.Item>
                  <List.Content>
                    <List.Header>Total</List.Header>${invoice.total}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Discount</List.Header>${invoice.discount}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Advance</List.Header>${invoice.advance}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Balance</List.Header>${invoice.balance}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>

            <Segment>
              <Header as="h4">
                <Icon name="calendar check outline" />
                Dates
              </Header>
              <List>
                <List.Item>
                  <Icon name="calendar" /> Invoice Date: {invoice.date}
                </List.Item>
                <List.Item>
                  <Icon name="calendar plus" /> Delivery Date:{" "}
                  {invoice.delivery_date}
                </List.Item>
              </List>
              <Header as="h4">
                <Icon name="comment alternate outline" />
                Remarks
              </Header>
              <p>{invoice.remarks}</p>
            </Segment>
            <Segment>
              <Accordion>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={handleClick}
                >
                  <Icon name="dropdown" />
                  Payments
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <List>
                    {invoice.invoice_payment.map((payment, index) => (
                      <List.Item>
                        <List.Icon
                          name={
                            payment.payment_mode === "Cash"
                              ? "money bill alternate"
                              : payment.payment_mode === "Card"
                              ? "credit card outline"
                              : "dollar sign"
                          }
                        />
                        <List.Content>
                          <List.Header>{payment.amount}</List.Header>
                          <List.Description>
                            {formatDate(payment.created_on)}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Accordion.Content>
              </Accordion>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={onClose}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </>
      ) : (
        ""
      )}
    </Modal>
  );
}

export default InvoiceModal;
