import {useEffect, useState} from 'react';
import {
  Apple,
  Circle,
  Fence,
  Fingerprint,
  Flight,
  Forest,
  MonetizationOn,
  Pets,
  Redeem,
  Restaurant,
  ShoppingCart,
  WineBar,
  Work,
} from '@mui/icons-material';
import {Box, ListItemIcon, ListItemText} from '@mui/material';
import Inputs from './Inputs';

const icons = {
  fingerprint: Fingerprint,
  briefcase: Work,
  dollar: MonetizationOn,
  cart: ShoppingCart,
  circle: Circle,
  gift: Redeem,
  vacation: Flight,
  food: Restaurant,
  fruit: Apple,
  pet: Pets,
  tree: Forest,
  chill: WineBar,
  fence: Fence,
};

const ContainerPicker: FC<{
  value?: string;
  onChange: (newValue?: string) => void;
}> = ({value, onChange}) => {
  const [contextualIdentities, setContextualIdentities] =
    useState<browser.contextualIdentities.ContextualIdentity[]>();

  useEffect(() => {
    browser.contextualIdentities.query({}).then(setContextualIdentities);
  }, []);

  console.log(value, contextualIdentities);

  return (
    <Inputs.Select
      label='Container'
      onChange={onChange}
      value={value}
      options={
        contextualIdentities
          ? contextualIdentities.reduce(
              (options, identity) => {
                const Icon = icons[identity.icon];

                options[identity.cookieStoreId] = (
                  <>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Icon
                        fontSize='small'
                        sx={{fill: identity.colorCode, mr: '12px'}}
                      />
                      <ListItemText>{identity.name}</ListItemText>
                    </Box>
                  </>
                );
                return options;
              },
              {'': 'No Container'},
            )
          : {}
      }
    />
  );
};

export default ContainerPicker;
