POLICE_BALANCE=10000000000000000000000  # 10000 ETH
USER_BALANCE=100000000000000000000      # 100 ETH
ganache-cli \
--account="0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,$POLICE_BALANCE" \
--account="0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab,$USER_BALANCE" \
--account="0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac,$USER_BALANCE"
