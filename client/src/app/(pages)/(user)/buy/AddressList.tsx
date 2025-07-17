import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddressListProps } from "@/type";

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onAddressSelect,
}) => {
  return (
    <div className="mt-8">
      {addresses?.length > 0 && (
        <h3 className="text-xl font-semibold text-white mb-4">
          Saved Addresses
        </h3>
      )}
      <div className="space-y-4">
        {addresses?.map((address) => (
          <Card
            key={address.id}
            className="bg-zinc-800 border border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500/50 transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-white">{address.fullName}</p>
                  <p className="text-zinc-300">{address.email}</p>
                  <p className="text-zinc-300">{address.address}</p>
                  <p className="text-zinc-300">
                    {address.city}, {address.state}, {address.country} -{" "}
                    {address.zipCode}
                  </p>
                </div>
                <Button
                  onClick={() => onAddressSelect(address)}
                  variant="outline"
                  size="sm"
                  className="bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-colors duration-300"
                >
                  Use This Address
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddressList;
